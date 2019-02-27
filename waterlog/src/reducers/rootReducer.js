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
import MapsReducer from './MapsReducer';
import AlertsReducer from './AlertsReducer';
import DailyCostReducer from './DailyCostReducer';
import MonthlyCostReducer from './MonthlyCostReducer';
import SeasonalCostReducer from './SeasonalCostReducer';
import UsageGraphDailyReducer from './UsageGraphDailyReducer';
import UsageGraphMonthlyReducer from './UsageGraphMonthlyReducer';
import UsageGraphSeasonallyReducer from './UsageGraphSeasonallyReducer';
import CostsDailyForecastReducer from './CostsDailyForecastReducer';
import CostsMonthlyForecastReducer from './CostsMonthlyForecastReducers';
import { reduxPollingNamespace, reduxPollingReducer } from 'redux-polling';
import HeatMapsReducer from './HeatMapsReducer';
import NotisNumberReducer from './NotisNumberReducer';

const rootReducer = combineReducers({
  leaks: SegmentLeaksReducer,
  leak: SegmentLeaksByIdReducer,
  litres: LeakLitresReducer,
  history: SegmentLeaksHistoryReducer,
  leaksResolves: LeaksResolvedReducer,
  events: SegmentEventsReducer,
  dailyWaste: WastageGraphDailyReducer,
  monthlyWaste: WastageGraphMonthlyReducer,
  seasonWaste: WastageGraphSeasonallyReducer,
  dailyCost: DailyCostReducer,
  monthlyCost: MonthlyCostReducer,
  seasonalCost: SeasonalCostReducer,
  dailyUsage: UsageGraphDailyReducer,
  monthlyUsage: UsageGraphMonthlyReducer,
  seasonUsage: UsageGraphSeasonallyReducer,
  levels: TankLevelReducer,
  level: TankLevelsByIdReducer,
  pumps: PumpsReducer,
  maps: MapsReducer,
  alerts: AlertsReducer,
  forecastDaily:CostsDailyForecastReducer,
  forecastMonthly:CostsMonthlyForecastReducer,
  heatMap:HeatMapsReducer,
  [reduxPollingNamespace]: reduxPollingReducer,
  numNotifs : NotisNumberReducer
});
export default rootReducer;
