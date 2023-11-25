
import * as moment from 'moment';
import 'moment/locale/pt-br';
import * as MomentRange from 'moment-range';

moment.locale('pt-br');

const momentRange = MomentRange.extendMoment(moment);

export function matchTotalDays(startAt: string, endAt: string, moment: any,  momentRange: any): number {


    const startDateMoment = moment(startAt);
    const endDateMoment = moment(endAt);

    // Crie um intervalo de datas usando moment-range
    const dateRange = momentRange.range(startDateMoment, endDateMoment);

    // Calcule a diferença em dias
    const totalDays = dateRange.diff('days') + 1; // Adiciona 1 para incluir o último dia

    return totalDays;
}