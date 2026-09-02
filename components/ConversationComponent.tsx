'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import AgoraRTC, {
  useRTCClient,
  useLocalMicrophoneTrack,
  useRemoteUsers,
  useClientEvent,
  useJoin,
  usePublish,
  RemoteUser,
  UID,
} from 'agora-rtc-react';
import {
  AgoraVoiceAI,
  AgoraVoiceAIEvents,
  AgentState,
  MessageSalStatus,
  TranscriptHelperMode,
  type TranscriptHelperItem,
  type UserTranscription,
  type AgentTranscription,
} from 'agora-agent-client-toolkit';
import { AgentVisualizer } from 'agora-agent-uikit';
import { MicButtonWithVisualizer } from 'agora-agent-uikit/rtc';
import { DEFAULT_AGENT_UID } from '@/lib/agora';
import { SalesIntelligencePanel } from './SalesIntelligencePanel';
import { CustomerMemoryPanel } from './CustomerMemoryPanel';
import {
  getCurrentInProgressMessage,
  getMessageList,
  mapAgentVisualizerState,
  normalizeTimestampMs,
  normalizeTranscript,
} from '@/lib/conversation';
import { MicrophoneSelector } from './MicrophoneSelector';
import {
  getConversationIssueSeverity,
  type ConnectionIssue,
} from './ConversationErrorCard';
import { ConnectionStatusPanel } from './ConnectionStatusPanel';
import { QuickstartConversationLayout } from './QuickstartConversationLayout';
import {
  QuickstartPipelineMetrics,
  type QuickstartAgentMetric,
} from './QuickstartPipelineMetrics';
import { QuickstartTranscriptPanel } from './QuickstartTranscriptPanel';
import type { ConversationComponentProps } from '@/types/conversation';

const MAX_CONNECTION_ISSUES = 6;

type AgoraRtcWithParameters = typeof AgoraRTC & {
  setParameter?: (key: string, value: unknown) => void;
};

type RtmMessageErrorPayload = {
  object: 'message.error';
  module?: string;
  code?: number;
  message?: string;
  send_ts?: number;
};

type RtmSalStatusPayload = {
  object: 'message.sal_status';
  status?: string;
  timestamp?: number;
};

type CustomerMemory = {
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

function isRtmMessageErrorPayload(
  value: unknown,
): value is RtmMessageErrorPayload {
  return (
    !!value &&
    typeof value === 'object' &&
    (value as { object?: unknown }).object === 'message.error'
  );
}

function isRtmSalStatusPayload(
  value: unknown,
): value is RtmSalStatusPayload {
  return (
    !!value &&
    typeof value === 'object' &&
    (value as { object?: unknown }).object === 'message.sal_status'
  );
}

export default function ConversationComponent({
  agoraData,
  rtmClient,
  onTokenWillExpire,
  onEndConversation,
}: ConversationComponentProps) {
  const client = useRTCClient();
  const remoteUsers = useRemoteUsers();

  const [isEnabled, setIsEnabled] = useState(true);
  const [isAgentConnected, setIsAgentConnected] = useState(false);
  const [isConnectionDetailsOpen, setIsConnectionDetailsOpen] =
    useState(false);

  const [connectionState, setConnectionState] =
    useState<string>('CONNECTING');

  const agentUID = String(DEFAULT_AGENT_UID);
  const [joinedUID, setJoinedUID] = useState<UID>(0);

  const [rawTranscript, setRawTranscript] = useState<
    TranscriptHelperItem<Partial<UserTranscription | AgentTranscription>>[]
  >([]);

  const [agentState, setAgentState] =
    useState<AgentState | null>(null);

  const [agentMetrics, setAgentMetrics] = useState<
    QuickstartAgentMetric[]
  >([]);

  // Stable customer ID for the current conversation.
  // agoraData.uid is available from the moment the conversation starts.
  const customerId = String(agoraData.uid);

  // SalesPilot AI intelligence state.
  const [salesIntelligence, setSalesIntelligence] = useState<{
    intent: string;
    sentiment: string;
    objection: string | null;
    buyingStage: string;
    leadScore: number;
    nextBestAction: string;
    customerProfile?: {
      name?: string;
      role?: string;
      company?: string;
      budget?: string;
      needs: string[];
      preferences: string[];
    };
  } | null>(null);

  // Customer Memory state.
  const [customerMemory, setCustomerMemory] =
    useState<CustomerMemory | null>(null);

  const [connectionIssues, setConnectionIssues] = useState<
    ConnectionIssue[]
  >([]);

  const addConnectionIssue = useCallback(
    (issue: ConnectionIssue) => {
      setConnectionIssues((prev) => {
        const isDuplicate = prev.some(
          (x) =>
            x.agentUserId === issue.agentUserId &&
            x.code === issue.code &&
            x.message === issue.message &&
            Math.abs(x.timestamp - issue.timestamp) < 1500,
        );

        if (isDuplicate) return prev;

        return [issue, ...prev].slice(
          0,
          MAX_CONNECTION_ISSUES,
        );
      });
    },
    [],
  );

  useEffect(() => {
    if (connectionIssues.length > 0) {
      setIsConnectionDetailsOpen(true);
    }
  }, [connectionIssues.length]);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const id = setTimeout(() => {
      if (!cancelled) {
        setIsReady(true);
      }
    }, 0);

    return () => {
      cancelled = true;
      clearTimeout(id);
      setIsReady(false);
    };
  }, []);

  const { isConnected: joinSuccess } = useJoin(
    {
      appid: process.env.NEXT_PUBLIC_AGORA_APP_ID!,
      channel: agoraData.channel,
      token: agoraData.token,
      uid: parseInt(agoraData.uid, 10),
    },
    isReady,
  );

  const { localMicrophoneTrack } =
    useLocalMicrophoneTrack(isReady);

  useEffect(() => {
    if (!client) return;

    try {
      (
        AgoraRTC as AgoraRtcWithParameters
      ).setParameter?.(
        'ENABLE_AUDIO_PTS',
        true,
      );
    } catch (error) {
      console.warn(
        'Could not set ENABLE_AUDIO_PTS:',
        error,
      );
    }
  }, [client]);

  useEffect(() => {
    if (joinSuccess && client) {
      const uid = client.uid;

      if (uid !== null && uid !== undefined) {
        setJoinedUID(uid);
      }
    }
  }, [joinSuccess, client]);

  useEffect(() => {
    if (!isReady || !joinSuccess) return;

    let cancelled = false;

    (async () => {
      try {
        const ai = await AgoraVoiceAI.init({
          rtcEngine: client,
          rtmConfig: {
            rtmEngine: rtmClient,
          },
          renderMode: TranscriptHelperMode.TEXT,
          enableLog: true,
        });

        if (cancelled) {
          try {
            if (AgoraVoiceAI.getInstance() === ai) {
              ai.unsubscribe();
              ai.destroy();
            }
          } catch {}

          return;
        }

        ai.on(
          AgoraVoiceAIEvents.TRANSCRIPT_UPDATED,
          (t) => {
            setRawTranscript([...t]);
          },
        );

        ai.on(
          AgoraVoiceAIEvents.AGENT_STATE_CHANGED,
          (_, event) => {
            setAgentState(event.state);
          },
        );

        ai.on(
          AgoraVoiceAIEvents.AGENT_METRICS,
          (_, metrics) => {
            setAgentMetrics((prev) =>
              [...prev, metrics].slice(-8),
            );
          },
        );

        ai.on(
          AgoraVoiceAIEvents.MESSAGE_ERROR,
          (agentUserId, error) => {
            addConnectionIssue({
              id: `${Date.now()}-${agentUserId}-message-error-${error.code}`,
              source: 'rtm',
              agentUserId,
              code: error.code,
              message: error.message,
              timestamp: normalizeTimestampMs(
                error.timestamp,
              ),
            });
          },
        );

        ai.on(
          AgoraVoiceAIEvents.MESSAGE_SAL_STATUS,
          (agentUserId, salStatus) => {
            if (
              salStatus.status ===
                MessageSalStatus.VP_REGISTER_FAIL ||
              salStatus.status ===
                MessageSalStatus.VP_REGISTER_DUPLICATE
            ) {
              addConnectionIssue({
                id: `${Date.now()}-${agentUserId}-sal-${salStatus.status}`,
                source: 'rtm',
                agentUserId,
                code: salStatus.status,
                message: `SAL status: ${salStatus.status}`,
                timestamp: normalizeTimestampMs(
                  salStatus.timestamp,
                ),
              });
            }
          },
        );

        ai.on(
          AgoraVoiceAIEvents.AGENT_ERROR,
          (agentUserId, error) => {
            addConnectionIssue({
              id: `${Date.now()}-${agentUserId}-agent-error-${error.code}`,
              source: 'agent',
              agentUserId,
              code: error.code,
              message: `${error.type}: ${error.message}`,
              timestamp: normalizeTimestampMs(
                error.timestamp,
              ),
            });
          },
        );

        ai.subscribeMessage(agoraData.channel);
      } catch (error) {
        if (!cancelled) {
          console.error(
            '[AgoraVoiceAI] init failed:',
            error,
          );
        }
      }
    })();

    return () => {
      cancelled = true;

      try {
        const ai = AgoraVoiceAI.getInstance();

        if (ai) {
          ai.unsubscribe();
          ai.destroy();
        }
      } catch {}
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady, joinSuccess]);

  useEffect(() => {
    const handleRtmMessage = (event: {
      message: string | Uint8Array;
      publisher: string;
    }) => {
      const payloadText =
        typeof event.message === 'string'
          ? event.message
          : new TextDecoder().decode(event.message);

      let parsed: unknown;

      try {
        parsed = JSON.parse(payloadText);
      } catch {
        return;
      }

      if (isRtmMessageErrorPayload(parsed)) {
        const p = parsed;

        addConnectionIssue({
          id: `${Date.now()}-${event.publisher}-rtm-msg-error-${p.code ?? 'unknown'}`,
          source: 'rtm-signaling',
          agentUserId: event.publisher,
          code: p.code ?? 'unknown',
          message: `${p.module ?? 'unknown'}: ${
            p.message ?? 'Unknown signaling error'
          }`,
          timestamp: normalizeTimestampMs(
            p.send_ts ?? Date.now(),
          ),
        });

        return;
      }

      if (isRtmSalStatusPayload(parsed)) {
        const p = parsed;

        if (
          p.status === 'VP_REGISTER_FAIL' ||
          p.status === 'VP_REGISTER_DUPLICATE'
        ) {
          addConnectionIssue({
            id: `${Date.now()}-${event.publisher}-rtm-sal-${p.status}`,
            source: 'rtm-signaling',
            agentUserId: event.publisher,
            code: p.status,
            message: `SAL status: ${p.status}`,
            timestamp: normalizeTimestampMs(
              p.timestamp ?? Date.now(),
            ),
          });
        }
      }
    };

    rtmClient.addEventListener(
      'message',
      handleRtmMessage,
    );

    return () => {
      rtmClient.removeEventListener(
        'message',
        handleRtmMessage,
      );
    };
  }, [rtmClient, addConnectionIssue]);

  const transcript = useMemo(() => {
    return normalizeTranscript(
      rawTranscript,
      String(client.uid),
    );
  }, [rawTranscript, client.uid]);

  const messageList = useMemo(
    () => getMessageList(transcript),
    [transcript],
  );

  const currentInProgressMessage = useMemo(() => {
    return getCurrentInProgressMessage(transcript);
  }, [transcript]);

  // Load persistent customer memory from Supabase.
  useEffect(() => {
    if (
      !customerId ||
      customerId === 'undefined' ||
      customerId === 'null'
    ) {
      console.warn(
        '[SalesPilot] Invalid customer ID:',
        customerId,
      );
      return;
    }

    const loadCustomerMemory = async () => {
      try {
        const response = await fetch(
          `/api/customer-memory?customerId=${encodeURIComponent(
            customerId,
          )}`,
        );

        if (!response.ok) {
          console.error(
            '[SalesPilot] Customer memory fetch failed:',
            await response.text(),
          );
          return;
        }

        const data = await response.json();

        if (data?.memory) {
          setCustomerMemory(data.memory);

          console.log(
            '[SalesPilot] Customer memory loaded:',
            data.memory,
          );
        }
      } catch (error) {
        console.error(
          '[SalesPilot] Customer memory loading error:',
          error,
        );
      }
    };

    loadCustomerMemory();
  }, [customerId]);

  // Analyze conversation + update persistent customer memory.
  useEffect(() => {
    if (messageList.length === 0) return;

    const conversationText = messageList
      .map((message) => {
        const role =
          String(message.uid) === customerId
            ? 'Customer'
            : 'SalesPilot';

        return `${role}: ${message.text}`;
      })
      .join('\n');

    if (!conversationText.trim()) return;

    const analyzeSalesConversation = async () => {
      try {
        const response = await fetch(
          '/api/sales-intelligence',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              transcript: conversationText,
            }),
          },
        );

        if (!response.ok) {
          console.error(
            'Sales intelligence request failed:',
            await response.text(),
          );
          return;
        }

        const data = await response.json();

        if (data?.intelligence) {
          const intelligence = data.intelligence;

          setSalesIntelligence(intelligence);

          console.log(
            '[SalesPilot] Full intelligence:',
            intelligence,
          );

          console.log(
            '[SalesPilot] Customer profile:',
            intelligence.customerProfile,
          );

          const profile =
            intelligence.customerProfile;

          const memoryUpdates = {
            name: profile?.name,
            role: profile?.role,
            company: profile?.company,
            budget: profile?.budget,

            needs: profile?.needs ?? [],

            preferences:
              profile?.preferences ?? [],

            objections:
              intelligence.objection
                ? [intelligence.objection]
                : [],

            buyingStage:
              intelligence.buyingStage,

            lastIntent:
              intelligence.intent,

            lastSentiment:
              intelligence.sentiment,

            notes: [
              `Lead Score: ${intelligence.leadScore}/100`,
              `Next Best Action: ${intelligence.nextBestAction}`,
            ],
          };

          console.log(
            '[SalesPilot] Memory update payload:',
            memoryUpdates,
          );

          try {
            if (
              !customerId ||
              customerId === 'undefined' ||
              customerId === 'null'
            ) {
              console.warn(
                '[SalesPilot] Skipping memory update because customer ID is invalid:',
                customerId,
              );

              return;
            }

            const memoryResponse = await fetch(
              '/api/customer-memory',
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  customerId,
                  ...memoryUpdates,
                }),
              },
            );

            if (!memoryResponse.ok) {
              console.error(
                '[SalesPilot] Customer memory update failed:',
                await memoryResponse.text(),
              );

              return;
            }

            const memoryData =
              await memoryResponse.json();

            console.log(
              '[SalesPilot] Customer memory response:',
              memoryData,
            );

            if (memoryData?.memory) {
              setCustomerMemory(
                memoryData.memory,
              );
            }
          } catch (memoryError) {
            console.error(
              '[SalesPilot] Customer memory error:',
              memoryError,
            );
          }
        }
      } catch (error) {
        console.error(
          'Sales intelligence error:',
          error,
        );
      }
    };

    const timeout = setTimeout(
      analyzeSalesConversation,
      1200,
    );

    return () => clearTimeout(timeout);
  }, [messageList, customerId]);

  usePublish([localMicrophoneTrack]);

  useClientEvent(
    client,
    'user-joined',
    (user) => {
      if (user.uid.toString() === agentUID) {
        setIsAgentConnected(true);
      }
    },
  );

  useClientEvent(
    client,
    'user-left',
    (user) => {
      if (user.uid.toString() === agentUID) {
        setIsAgentConnected(false);
      }
    },
  );

  useEffect(() => {
    const isAgentInRemoteUsers =
      remoteUsers.some(
        (user) =>
          user.uid.toString() === agentUID,
      );

    setIsAgentConnected(
      isAgentInRemoteUsers,
    );
  }, [remoteUsers, agentUID]);

  useClientEvent(
    client,
    'connection-state-change',
    (curState) => {
      setConnectionState(curState);
    },
  );

  const connectionSeverity =
    useMemo<'normal' | 'warning' | 'error'>(() => {
      if (
        connectionState === 'DISCONNECTED' ||
        connectionState === 'DISCONNECTING'
      ) {
        return 'error';
      }

      if (
        connectionState === 'CONNECTING' ||
        connectionState === 'RECONNECTING'
      ) {
        return 'warning';
      }

      if (connectionIssues.length === 0) {
        return 'normal';
      }

      return connectionIssues.some(
        (issue) =>
          getConversationIssueSeverity(
            issue,
          ) === 'error',
      )
        ? 'error'
        : 'warning';
    }, [connectionState, connectionIssues]);

  const visualizerState = useMemo(
    () =>
      mapAgentVisualizerState(
        agentState,
        isAgentConnected,
        connectionState,
      ),
    [
      agentState,
      isAgentConnected,
      connectionState,
    ],
  );

  const handleMicToggle =
    useCallback(async () => {
      const next = !isEnabled;
      const track = localMicrophoneTrack;

      if (!track) {
        setIsEnabled(next);
        return;
      }

      try {
        await track.setEnabled(next);
        setIsEnabled(next);
      } catch (error) {
        console.error(
          'Failed to toggle microphone:',
          error,
        );
      }
    }, [
      isEnabled,
      localMicrophoneTrack,
    ]);

  const handleTokenWillExpire =
    useCallback(async () => {
      if (
        !onTokenWillExpire ||
        !joinedUID
      ) {
        return;
      }

      try {
        const {
          rtcToken,
          rtmToken,
        } = await onTokenWillExpire(
          joinedUID.toString(),
        );

        await client?.renewToken(
          rtcToken,
        );

        await rtmClient.renewToken(
          rtmToken,
        );
      } catch (error) {
        console.error(
          'Failed to renew Agora token:',
          error,
        );
      }
    }, [
      client,
      onTokenWillExpire,
      joinedUID,
      rtmClient,
    ]);

  useClientEvent(
    client,
    'token-privilege-will-expire',
    handleTokenWillExpire,
  );

  const handleEndConversation =
    useCallback(async () => {
      onEndConversation();
    }, [onEndConversation]);

  return (
    <QuickstartConversationLayout
      statusPanel={
        <ConnectionStatusPanel
          connectionState={
            connectionState
          }
          connectionSeverity={
            connectionSeverity
          }
          connectionIssues={
            connectionIssues
          }
          isOpen={
            isConnectionDetailsOpen
          }
          onToggle={() =>
            setIsConnectionDetailsOpen(
              (open) => !open,
            )
          }
        />
      }
      pipelineMetrics={
        <QuickstartPipelineMetrics
          metrics={agentMetrics}
        />
      }
      salesIntelligence={
        <div className="flex min-h-0 flex-col gap-4">
          <SalesIntelligencePanel
  intelligence={salesIntelligence}
  customerId={customerId}
/>

          <CustomerMemoryPanel
            memory={customerMemory}
          />
        </div>
      }
      transcriptPanel={
        <QuickstartTranscriptPanel
          messageList={messageList}
          currentInProgressMessage={
            currentInProgressMessage
          }
          agentUID={agentUID}
        />
      }
      visualizer={
        <div
          className="relative flex h-full min-h-[20rem] w-full max-w-4xl items-center justify-center"
          role="region"
          aria-label="AI agent status visualization"
        >
          <AgentVisualizer
            state={visualizerState}
            size="lg"
          />

          {remoteUsers.map((user) => (
            <div
              key={user.uid}
              className="hidden"
            >
              <RemoteUser user={user} />
            </div>
          ))}
        </div>
      }
      controls={
        <div
          className="mx-auto flex w-fit items-center gap-3 rounded-full border border-border bg-card/80 px-4 py-2 backdrop-blur-md"
          role="group"
          aria-label="Audio controls"
        >
          <div className="conversation-mic-host flex items-center justify-center">
            <MicButtonWithVisualizer
              isEnabled={isEnabled}
              setIsEnabled={
                setIsEnabled
              }
              track={
                localMicrophoneTrack
              }
              onToggle={
                handleMicToggle
              }
              className="overflow-visible"
              aria-label={
                isEnabled
                  ? 'Mute microphone'
                  : 'Unmute microphone'
              }
              enabledColor="hsl(var(--primary))"
              disabledColor="hsl(var(--destructive))"
            />
          </div>

          <MicrophoneSelector
            localMicrophoneTrack={
              localMicrophoneTrack
            }
          />
        </div>
      }
      onEndConversation={
        handleEndConversation
      }
    />
  );
}