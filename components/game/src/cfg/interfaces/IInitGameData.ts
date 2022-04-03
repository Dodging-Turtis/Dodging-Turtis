export interface IInitGameData {
    initMetaData: Array<IUserNftWithMetadata>;
    highScore: number;
    endGameCB: (score: number, metersTravelled: number) => void;
    mintTurtisCB: () => void;
    goHomeCB: () => void;
}