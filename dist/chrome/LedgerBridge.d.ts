export default class LedgerBridge {
    makeApp(): Promise<void>;
    transport: import("@ledgerhq/hw-transport").default | undefined;
    app: LedgerEth | null | undefined;
    cleanUp(): Promise<void>;
    unlock(hdPath: any): Promise<{
        publicKey: string;
        address: string;
        chainCode?: string | undefined;
    }>;
    signTransaction(hdPath: any, tx: any, to: any): Promise<{
        s: string;
        v: string;
        r: string;
    }>;
    signPersonalMessage(hdPath: any, message: any): Promise<{
        v: number;
        s: string;
        r: string;
    }>;
    ledgerErrToMessage(err: any): any;
}
import LedgerEth from "@ledgerhq/hw-app-eth";
