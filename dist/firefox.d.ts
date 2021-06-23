export default FirefoxLedgerBridge;
declare class FirefoxLedgerBridge extends EventEmitter {
    constructor(opts?: {});
    accountDetails: {};
    bridgeUrl: any;
    type: string;
    page: number;
    perPage: number;
    unlockedAccount: number;
    hdk: any;
    paths: {};
    iframe: HTMLIFrameElement | null;
    network: string;
    implementFullBIP44: boolean;
    iframeLoaded: boolean;
    serialize(): Promise<{
        hdPath: any;
        accounts: any;
        accountDetails: {};
        bridgeUrl: any;
        implementFullBIP44: boolean;
    }>;
    deserialize(opts?: {}): Promise<void>;
    hdPath: any;
    accounts: any;
    isUnlocked(): boolean;
    setAccountToUnlock(index: any): void;
    setHdPath(hdPath: any): void;
    unlock(hdPath: any): Promise<any>;
    getFirstPage(): Promise<{
        address: any;
        balance: null;
        index: any;
    }[]>;
    getNextPage(): Promise<{
        address: any;
        balance: null;
        index: any;
    }[]>;
    getPreviousPage(): Promise<{
        address: any;
        balance: null;
        index: any;
    }[]>;
    updateTransportMethod(): void;
    signTransaction(address: any, tx: any, accountIndex: any): Promise<any>;
    _setupIframe(): void;
    _getOrigin(): any;
    _sendMessage(msg: any, cb: any): void;
    __getPage(increment: any): Promise<{
        address: any;
        balance: null;
        index: any;
    }[]>;
    _getAccountsBIP44(from: any, to: any): Promise<{
        address: any;
        balance: null;
        index: any;
    }[]>;
    _getAccountsLegacy(from: any, to: any): {
        address: string;
        balance: null;
        index: any;
    }[];
    _padLeftEven(hex: any): any;
    _normalize(buf: any): any;
    _addressFromIndex(pathBase: any, i: any): string;
    _pathFromAddress(address: any): string;
    _toAscii(hex: any): string;
    _getPathForIndex(index: any): string;
    _isLedgerLiveHdPath(): boolean;
    _toLedgerPath(path: any): any;
    _hasPreviousTransactions(address: any): Promise<boolean>;
    _getApiUrl(): any;
}
declare namespace FirefoxLedgerBridge {
    export { type };
}
import { EventEmitter } from "node/events";
declare const type: "Ledger Hardware";
