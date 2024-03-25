import { Pipe, PipeTransform } from "@angular/core";

export interface PropList {
    statusName: string,
    status: string
}

@Pipe({
    name: 'trueStatus'
})
export class trueStatus implements PipeTransform {
    deliveryTypes: PropList[] = [
        { status: '', statusName: 'Самовывоз' },
        { status: 'mileby', statusName: 'Доставка' },
        { status: 'belpost', statusName: 'Белпочта' },
    ]
    storeList: PropList[] = [
        { status: '8', statusName: 'Долгиновский' },
        { status: '11', statusName: 'Брест' },
        { status: '18', statusName: 'Партизанский' },
        { status: '21', statusName: 'Тимирязева' },
        { status: '22', statusName: 'Каменогорская' },
        { status: '24', statusName: 'Независимости' },
        { status: '25', statusName: 'Молодечно' },
        { status: '31', statusName: 'Diamond' },
        { status: '32', statusName: 'Outleto' },
        { status: '34', statusName: 'Expobel' },
        { status: '35', statusName: 'Горецкого' },
    ]
    statusList: PropList[] = [
        { status: 'не принят', statusName: 'Готов к сборке' },
        { status: 'в паузе', statusName: 'Некомплект' },
        { status: 'завершен', statusName: 'Готов к отгрузке' },
        { status: 'Выполнен', statusName: 'Выполнен' },
        { status: 'Отмена', statusName: 'Вернуть в секцию' },
        { status: 'Заблокирован', statusName: 'Отменен' },
    ]
    transform(element: string, type: string): string {
        let trueStatus = element
        switch (type) {
            case 'delivery':
                this.deliveryTypes.forEach(e => {
                    trueStatus = element == e.status ? e.statusName : trueStatus
                })
                break;
            case 'store':
                this.storeList.forEach(e => {
                    trueStatus = element == e.status ? e.statusName : trueStatus
                })
                break;
            case 'status':
                this.statusList.forEach(e => {
                    trueStatus = element == e.status ? e.statusName : trueStatus
                })
                break;
        }
        return trueStatus
    }
}