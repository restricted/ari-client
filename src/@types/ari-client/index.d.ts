// Type definitions for ari-client v2.1.0
// Project: https://www.npmjs.com/package/ari-client
// Definitions by: Dementyev Alexey <https://github.com/restricted/>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module 'ari-client' {

    export type AriClientEvent = 'StasisStart';
    export type AriEvent = AriStasisStartEvent;

    export interface AriInstance {

        asterisk: AriAsterisk;
        bridges: AriBridge;
        channels: AriChannel;
        endpoints: any;
        applications: AriApplication;

        on(clientEvent: AriClientEvent, cb: (event: AriEvent, channelInstance: AriChannel) => void): void;

        once(clientEvent: AriClientEvent, cb: (event: AriEvent, channelInstance: AriChannel) => void): void;

        answer(cb: (err?: any) => void): void;

        answer(): Promise<null>;

    }

    export interface AriAsterisk {

        addLog(options: { configuration: string, logChannelName: string }, cb: (err: any) => void): void;

        addLog(options: { configuration: string, logChannelName: string }): Promise<null>;

        deleteLog(options: { logChannelName: string }, cb: (err: any) => void): void;

        deleteLog(options: { logChannelName: string }): Promise<null>;

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

    export interface AriApplication {
        get(options: {
                applicationName: string
            },
            cb: (err: any, application: any) => void): void;

        get(options: { applicationName: string }): Promise<any>;

        list(cb: (err: any, applications: any) => void): void;

        list(): Promise<any>;

        subscribe(options: {
            applicationName: string,
            eventSource: string
        }, cb: (err: any, application: any) => void): void;

        subscribe(options: {
            applicationName: string,
            eventSource: string
        }): Promise<any>;

        unsubscribe(options: {
            applicationName: string,
            eventSource: string
        }, cb: (err: any, application: any) => void): void;

        unsubscribe(options: {
            applicationName: string,
            eventSource: string
        }): Promise<any>;


    }

    export interface AriChannel {
        id: string;
        accountcode: string;
        caller: AriCallerId;
        channelvars?: object;
        connected: AriCallerId;
        creationtime: Date;
        dialplan: AriDialplanCEP;

        answer(): void;

        continueInDialplan(): void;

        create(): void;

        dial(): void;

        get(): void;
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

        list(): Promise<any>;

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

