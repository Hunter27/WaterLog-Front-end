import { combineReducers } from 'redux';
import SegmentLeaksReducer from './SegmentLeaksReducer';
import SegmentLeaksByIdReducer from './SegmentLeaksByIdReducer';
import LeakLitresReducer from './LeakLitresReducer';
import SegmentLeaksHistoryReducer from './SegmentLeaksHistoryReducer';
import LeaksResolvedReducer from './LeaksResolvedReducer';
import SegmentEventsReducer from './SegmentEventsReducer';
import WastageGraphDailyReducer from './WastageGraphDailyReducer';
import WastageGraphMonthlyReducer from './WastageGraphMonthlyReducer';
import WastageGraphSeasonallyReducer from './WastageGraphSeasonallyReducer';
import PumpsReducer from './PumpsReducer';
import TankLevelReducer from './TankLevelReducer';
import TankLevelsByIdReducer from './TankLevelsByIdReducer';
import DailyCostReducer from './DailyCostReducer';  
import MonthlyCostReducer from './MonthlyCostReducer';
import SeasonalCostReducer from './SeasonalCostReducer';

export default combineReducers({
	leaks: SegmentLeaksReducer,
	leak: SegmentLeaksByIdReducer,
	litres: LeakLitresReducer,
	history: SegmentLeaksHistoryReducer,
	leaksResolves: LeaksResolvedReducer,
	events: SegmentEventsReducer,
	dailyWaste: WastageGraphDailyReducer,
	monthlyWaste: WastageGraphMonthlyReducer,
	seasonWaste: WastageGraphSeasonallyReducer,
	dailyCost:DailyCostReducer,
	monthlyCost: MonthlyCostReducer,
    seasonalCost:SeasonalCostReducer,
	levels: TankLevelReducer,
	level: TankLevelsByIdReducer,
   	pumps: PumpsReducer
});


