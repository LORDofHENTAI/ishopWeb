export class orderHistoryReq {
    constructor(
        public token: string,
        public orderNum?: string,
        public Date?: string
    ) { }
}