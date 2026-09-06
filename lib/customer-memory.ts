import { createClient } from '@supabase/supabase-js';

export type CustomerMemory = {
  customerId: string;
  name?: string;
  role?: string;
  company?: string;
  budget?: string;
  needs: string[];
  preferences: string[];
  objections: string[];
  buyingStage?: string;
  lastIntent?: string;
  lastSentiment?: string;
  notes: string[];
  updatedAt: string;
};

type CustomerMemoryRow = {
  customer_id: string;
  name: string | null;
  role: string | null;
  company: string | null;
  budget: string | null;
  needs: string[] | null;
  preferences: string[] | null;
  objections: string[] | null;
  buying_stage: string | null;
  last_intent: string | null;
  last_sentiment: string | null;
  notes: string[] | null;
  updated_at: string;
};

function getSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabasePublishableKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabasePublishableKey) {
    throw new Error(
      'Missing Supabase environment variables. Check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.',
    );
  }

  return createClient(
    supabaseUrl,
    supabasePublishableKey,
  );
}

function createEmptyMemory(customerId: string): CustomerMemory {
  return {
    customerId,
    needs: [],
    preferences: [],
    objections: [],
    notes: [],
    updatedAt: new Date().toISOString(),
  };
}

function rowToMemory(row: CustomerMemoryRow): CustomerMemory {
  return {
    customerId: row.customer_id,
    name: row.name ?? undefined,
    role: row.role ?? undefined,
    company: row.company ?? undefined,
    budget: row.budget ?? undefined,
    needs: row.needs ?? [],
    preferences: row.preferences ?? [],
    objections: row.objections ?? [],
    buyingStage: row.buying_stage ?? undefined,
    lastIntent: row.last_intent ?? undefined,
    lastSentiment: row.last_sentiment ?? undefined,
    notes: row.notes ?? [],
    updatedAt: row.updated_at,
  };
}

export async function getCustomerMemory(
  customerId: string,
): Promise<CustomerMemory> {
  const { data, error } = await getSupabase()
    .from('customer_memory')
    .select('*')
    .eq('customer_id', customerId)
    .maybeSingle();

  if (error) {
    console.error(
      '[Customer Memory] Failed to fetch memory:',
      error,
    );
    throw new Error('Failed to fetch customer memory');
  }

  if (!data) {
    const emptyMemory = createEmptyMemory(customerId);

    const { data: createdData, error: createError } =
      await getSupabase()
        .from('customer_memory')
        .insert({
          customer_id: customerId,
          needs: [],
          preferences: [],
          objections: [],
          notes: [],
        })
        .select('*')
        .single();

    if (createError) {
      console.error(
        '[Customer Memory] Failed to create memory:',
        createError,
      );
      throw new Error('Failed to create customer memory');
    }

    return createdData
      ? rowToMemory(createdData as CustomerMemoryRow)
      : emptyMemory;
  }

  return rowToMemory(data as CustomerMemoryRow);
}

export async function updateCustomerMemory(
  customerId: string,
  updates: Partial<CustomerMemory>,
): Promise<CustomerMemory> {
  const currentMemory = await getCustomerMemory(customerId);

  const updatedMemory: CustomerMemory = {
    ...currentMemory,
    ...updates,

    needs: updates.needs
      ? Array.from(
          new Set([
            ...currentMemory.needs,
            ...updates.needs,
          ]),
        )
      : currentMemory.needs,

    preferences: updates.preferences
      ? Array.from(
          new Set([
            ...currentMemory.preferences,
            ...updates.preferences,
          ]),
        )
      : currentMemory.preferences,

    objections: updates.objections
      ? Array.from(
          new Set([
            ...currentMemory.objections,
            ...updates.objections,
          ]),
        )
      : currentMemory.objections,

    notes: updates.notes
      ? Array.from(
          new Set([
            ...currentMemory.notes,
            ...updates.notes,
          ]),
        )
      : currentMemory.notes,

    updatedAt: new Date().toISOString(),
  };

  const { data, error } = await getSupabase()
    .from('customer_memory')
    .upsert(
      {
        customer_id: customerId,
        name: updatedMemory.name ?? null,
        role: updatedMemory.role ?? null,
        company: updatedMemory.company ?? null,
        budget: updatedMemory.budget ?? null,
        needs: updatedMemory.needs,
        preferences: updatedMemory.preferences,
        objections: updatedMemory.objections,
        buying_stage: updatedMemory.buyingStage ?? null,
        last_intent: updatedMemory.lastIntent ?? null,
        last_sentiment: updatedMemory.lastSentiment ?? null,
        notes: updatedMemory.notes,
        updated_at: updatedMemory.updatedAt,
      },
      {
        onConflict: 'customer_id',
      },
    )
    .select('*')
    .single();

  if (error) {
    console.error(
      '[Customer Memory] Failed to update memory:',
      error,
    );
    throw new Error('Failed to update customer memory');
  }

  return rowToMemory(data as CustomerMemoryRow);
}

export async function addCustomerNeed(
  customerId: string,
  need: string,
): Promise<CustomerMemory> {
  return updateCustomerMemory(customerId, {
    needs: [need],
  });
}

export async function addCustomerObjection(
  customerId: string,
  objection: string,
): Promise<CustomerMemory> {
  return updateCustomerMemory(customerId, {
    objections: [objection],
  });
}

export async function addCustomerNote(
  customerId: string,
  note: string,
): Promise<CustomerMemory> {
  return updateCustomerMemory(customerId, {
    notes: [note],
  });
}

export async function clearCustomerMemory(
  customerId: string,
): Promise<void> {
  const { error } = await getSupabase()
    .from('customer_memory')
    .delete()
    .eq('customer_id', customerId);

  if (error) {
    console.error(
      '[Customer Memory] Failed to clear memory:',
      error,
    );
    throw new Error('Failed to clear customer memory');
  }
}