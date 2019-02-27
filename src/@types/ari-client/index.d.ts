// Type definitions for ari-client v2.1.0
// Project: https://www.npmjs.com/package/ari-client
// Definitions by: Dementyev Alexey <https://github.com/restricted/>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module 'ari-client' {

    export enum AriClientEvent {
        APILoadError,
        ApplicationReplaced,
        StasisStart,
        ChannelDtmfReceived,
        BridgeAttendedTransfer,
        WebSocketReconnecting,
        WebSocketConnected,
        WebSocketMaxRetries
    }

    export enum AriBridgeEvent {
        BridgeBlindTransfer,
        BridgeCreated,
        BridgeDestroyed,
        BridgeMerged,
        BridgeVideoSourceChanged,
        ChannelCallerId,
        ChannelHangupRequest,
        ChannelStateChange,
        ChannelVarset
    }

    export enum AriChannelEvent {
        StasisStart,
        ChannelDtmfReceived,
        ChannelConnectedLine,
        ChannelCreated,
        ChannelDestroyed,
        ChannelDialplan,
        ChannelEnteredBridge,
        ChannelHold,
        ChannelLeftBridge,
        ChannelTalkingFinished,
        ChannelTalkingStarted,
        ChannelUnhold,
        ChannelUserevent,
        ContactStatusChange,
        EndpointStateChange,
        StasisEnd
    }

    export enum AriEndpointEvent {
        DeviceStateChanged,
        MissingParams,
        Peer,
        TextMessageReceived,
        PeerStatusChange,
        PlaybackContinuing
    }

    export enum AriPlaybackEvent {
        PlaybackStarted,
        RecordingFailed,
        RecordingFinished,
        RecordingStarted
    }

    export enum AriDeviceStateEvent {
        Dial
    }

    export type AriEvent = AriStasisStartEvent;

    type AriEventChannelCallback = (event: AriEvent, channelInstance: AriChannel) => void;

    export interface AriInstance {

        applications: AriApplication;
        asterisk: AriAsterisk;
        bridges: AriBridge;
        channels: AriChannel;
        deviceStates: AriDeviceState;
        endpoints: AriEndpoint;
        mailboxes: AriMailbox;
        playbacks: AriPlayback;
        recordings: AriRecording;
        sounds: any;

        on(clientEvent: AriClientEvent | keyof typeof AriClientEvent, cb: AriEventChannelCallback): void;

        once(clientEvent: AriClientEvent | keyof typeof AriClientEvent, cb: AriEventChannelCallback): void;

    }

    type AriErrCallback = (err: any) => void;

    type AriNullPromise = Promise<null>;

    export interface AriAsterisk {

        addLog(options: { configuration: string, logChannelName: string }, cb: AriErrCallback): void;

        addLog(options: { configuration: string, logChannelName: string }): AriNullPromise;

        deleteLog(options: { logChannelName: string }, cb: AriErrCallback): void;

        deleteLog(options: { logChannelName: string }): AriNullPromise;

        deleteObject(): void;

        getGlobalVar(): void;

        getInfo(): void;

        getModule(): void;

        getObject(): void;

        listLogChannels(): void;

        listModules(): void;

        loadModule(): void;

        reloadModule(): void;

        rotateLog(): void;

        setGlobalVar(): void;

        unloadModule(): void;

        updateObject(): void;
    }

    type AriDataCallback = (err: any, data: any) => void;

    type AriDataPromise = Promise<any>;

    export interface AriApplication {
        get(options: { applicationName: string }, cb: AriDataCallback): void;

        get(options: { applicationName: string }): AriDataPromise;

        list(cb: AriDataCallback): void;

        list(): AriDataPromise;

        subscribe(options: { applicationName: string, eventSource: string }, cb: AriDataCallback): void;

        subscribe(options: { applicationName: string, eventSource: string }): AriDataPromise;

        unsubscribe(options: { applicationName: string, eventSource: string }, cb: AriDataCallback): void;

        unsubscribe(options: { applicationName: string, eventSource: string }): AriDataPromise;


    }

    export interface AriEndpoint {
        get(): void;

        list(): void;

        listByTech(): void;

        sendMessage(): void;

        sendMessageToEndpoint(): void;
    }

    export interface AriSound {
        get(): void;

        list(): void;

    }

    export interface AriRecording {
        cancel(): void;

        copyStored(): void;

        deleteStored(): void;

        getLive(): void;

        getStored(): void;

        getStoredFile(): void;

        listStored(): void;

        mute(): void;

        pause(): void;

        stop(): void;

        unmute(): void;

        unpause(): void;
    }

    export interface AriPlayback {
        control(): void;

        get(): void;

        stop(): void;
    }

    export interface AriMailbox {
        delete(): void;

        get(): void;

        list(): void;

        update(): void;
    }

    export interface AriDeviceState {
        delete(): void;

        get(): void;

        list(): void;

        update(): void;
    }

    type AriChannelContinueInDialplanOptions = {
        channelId: string,
        context?: string,
        extension?: string,
        label?: string,
        priority?: number
    };

    type AriChannelCreateOptions = {
        app: string,
        appArgs?: string,
        channelId?: string,
        endpoint: string,
        formats?: string,
        originator?: string,
        otherChannelId?: string
    };

    type AriChannelDialOptions = {
        caller: string,
        channelId: string,
        timeout: number
    };

    type AriStdCallback = (err: any, channel: AriChannel) => void;

    type AriChannelOriginateOptions = {
        app?: string,
        appArgs?: string,
        callerId?: string,
        channelId?: string,
        context?: string,
        endpoint: string,
        extension?: string,
        formats?: string,
        label?: string,
        originator?: string,
        otherChannelId?: string,
        priority?: number,
        timeout?: number,
        variables?: object
    };

    type AriStdPromise = Promise<AriChannel>;

    type AriChannelPlayOptions = {
        channelId: string,
        lang?: string,
        media: string,
        offsetms?: number,
        playbackId?: string,
        skipms?: number
    };

    type AriPlaybackPromise = Promise<AriPlayback>;

    type AriChannelRecordOptions = {
        channelId: string,
        format: string,
        name: string,
        beep?: boolean,
        ifExists?: string,
        maxDurationSeconds?: number,
        maxSilenceSeconds?: number,
        terminateOn?: number
    };

    type AriChannelSendDTMFOptions = { channelId: string, after?: number, before?: number, between?: number, dtmf?: string, duration?: number };

    type AriChannelSnoopOptions = { app: string, channelId: string, appArgs?: string, sniipId?: string, spy?: string, whisper?: string };

    export interface AriChannel {
        id: string;
        accountcode: string;
        caller: AriCallerId;
        channelvars?: object;
        connected: AriCallerId;
        creationtime: Date;
        dialplan: AriDialplanCEP;

        on(channelEvent: AriChannelEvent | keyof typeof AriChannelEvent, cb: AriEventChannelCallback): void;

        answer(options: { channelId?: string }, cb: AriErrCallback): void;

        answer(options: { channelId?: string }): AriNullPromise;

        continueInDialplan(options: AriChannelContinueInDialplanOptions, cb: AriErrCallback): void;

        continueInDialplan(options: AriChannelContinueInDialplanOptions): AriNullPromise;

        create(options: AriChannelCreateOptions, cb: AriStdCallback): void;

        create(options: AriChannelCreateOptions): AriStdPromise;

        dial(options: AriChannelDialOptions, cb: AriErrCallback): void;

        dial(options: AriChannelDialOptions): AriNullPromise;

        get(options: { channelId: string }, cb: AriStdCallback): void;

        get(options: { channelId: string }): AriStdPromise;

        getChannelVar(options: { channelId: string, variable: string }, cb: AriDataCallback): void;

        getChannelVar(options: { channelId: string, variable: string }): AriDataPromise;

        hangup(options: { channelId: string, reason?: string }, cb: AriErrCallback): void;

        hangup(options: { channelId: string, reason?: string }): AriNullPromise;

        hold(options: { channelId: string }, cb: AriErrCallback): void;

        hold(options: { channelId: string }): AriNullPromise;

        list(cb: AriDataCallback): void;

        list(): AriDataPromise;

        mute(options: { channelId: string, direction: string }, cb: AriErrCallback): void;

        mute(options: { channelId: string, direction: string }): AriNullPromise;

        originate(options: AriChannelOriginateOptions, cb: AriStdCallback): void;

        originate(options: AriChannelOriginateOptions): AriStdPromise;

        originateWithId(options: AriChannelOriginateOptions, cb: AriStdCallback): void;

        originateWithId(options: AriChannelOriginateOptions): AriStdPromise;

        play(options: AriChannelPlayOptions, cb: (err: any, playback: AriPlayback) => void): void;

        play(options: AriChannelPlayOptions): AriPlaybackPromise;

        playWithId(options: AriChannelPlayOptions, cb: (err: any, playback: AriPlayback) => void): void;

        playWithId(options: AriChannelPlayOptions): AriPlaybackPromise;

        record(options: AriChannelRecordOptions, cb: (err: any, recording: AriRecording) => void): void;

        record(options: AriChannelRecordOptions): Promise<AriRecording>;

        redirect(options: { channelId: string, endpoint?: string }, cb: AriErrCallback): void;

        redirect(options: { channelId: string, endpoint?: string }): AriNullPromise;

        ring(options: { channelId: string }, cb: AriErrCallback): void;

        ring(options: { channelId: string }): AriNullPromise;

        ringStop(options: { channelId: string }, cb: AriErrCallback): void;

        ringStop(options: { channelId: string }): AriNullPromise;

        sendDTMF(options: AriChannelSendDTMFOptions, cb: AriErrCallback): void;

        sendDTMF(options: AriChannelSendDTMFOptions): AriNullPromise;

        setChannelVar(options: { channelId: string, variable: string }, cb: AriErrCallback): void;

        setChannelVar(options: { channelId: string, variable: string }): AriNullPromise;

        snoopChannel(options: AriChannelSnoopOptions, cb: AriErrCallback): void;

        snoopChannel(options: AriChannelSnoopOptions): AriNullPromise;

        snoopChannelWithId(options: AriChannelSnoopOptions, cb: AriErrCallback): void;

        snoopChannelWithId(options: AriChannelSnoopOptions): AriNullPromise;

        startMoh(options: { channelId: string, mohClass: string }, cb: AriErrCallback): void;

        startMoh(options: { channelId: string, mohClass: string }): AriNullPromise;

        startSilence(options: { channelId: string }, cb: AriErrCallback): void;

        startSilence(options: { channelId: string }): AriNullPromise;

        stopMoh(): void;

        stopSilence(): void;

        unhold(): void;
    }

    export interface AriStasisStartEvent {
        asterisk_id?: string;
        type: string;
        application: string;
        timestamp?: Date;
        args: [string];
        channel: AriChannel
        replace_channel?: AriChannel;
    }

    export interface AriDialplanCEP {
        context: string;
        exten: string;
        priority: number;
    }

    export interface AriCallerId {
        name: string;
        number: string;
    }

    export interface AriBridge {
        addChannel(): void;

        clearVideoSource(): void;

        create(): void;

        createWithId(): void;

        destroy(): void;

        get(): void;

        list(cb: (err: any, bridges: any[]) => void): void;

        list(): AriDataPromise;

        play(): void;

        playWithId(): void;

        record(): void;

        removeChannel(): void;

        setVideoSource(): void;

        startMoh(): void;

        stopMoh(): void;
    }

    export function connect(url: string,
                            username: string,
                            password: string,
                            cb: (err: any, ari: AriInstance) => void): void;

    export function connect(url: string,
                            username: string,
                            password: string): Promise<AriInstance>;
}

