export class orderHistoryRes {
    constructor(
        public id: number,
        public order: string,
        public statusChanged: string,
        public userLogin: string,
        public date: Date,
    ) { }
}