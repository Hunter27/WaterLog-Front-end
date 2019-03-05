import { combineReducers } from 'redux';
import SegmentLeaksReducer from './SegmentLeaksReducer';
import SegmentLeaksByIdReducer from './SegmentLeaksByIdReducer';
import SegmentEventsReducer from './SegmentEventsReducer';
import WastageGraphDailyReducer from './WastageGraphDailyReducer';
import WastageGraphMonthlyReducer from './WastageGraphMonthlyReducer';
import WastageGraphSeasonallyReducer from './WastageGraphSeasonallyReducer';
import PumpsReducer from './PumpsReducer';
import TankLevelReducer from './TankLevelReducer';
import TankLevelsByIdReducer from './TankLevelsByIdReducer';
import MapsReducer from './MapsReducer';
import PMapsReducer from './PMapsReducer';
import AlertsReducer from './AlertsReducer';
import DailyCostReducer from './DailyCostReducer';
import MonthlyCostReducer from './MonthlyCostReducer';
import SeasonalCostReducer from './SeasonalCostReducer';
import UsageGraphDailyReducer from './UsageGraphDailyReducer';
import UsageGraphMonthlyReducer from './UsageGraphMonthlyReducer';
import UsageGraphSeasonallyReducer from './UsageGraphSeasonallyReducer';
import CostsDailyForecastReducer from './CostsDailyForecastReducer';
import CostsMonthlyForecastReducer from './CostsMonthlyForecastReducers';
import HeatMapsReducer from './HeatMapsReducer';
import TankGraphReducer from './TankGraphReducer';
import FilterReducer from './FilterReducer';
import ForecastPlaceholderReducer from './ForecastPlaceHolderReducer';
import NotificationsReducer from './NotifNumberReducer';
import SegmentReducer from './SegmentReducer';
import SensorReducer from './SensorReducer';
import TankReducer from './TankReducer';

const rootReducer = combineReducers({
  leaks: SegmentLeaksReducer,
  leak: SegmentLeaksByIdReducer,
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
  pmaps: PMapsReducer,
  alerts: AlertsReducer,
  forecastDaily:CostsDailyForecastReducer,
  forecastMonthly:CostsMonthlyForecastReducer,
  dailytankgraph:TankGraphReducer,
  heatMap:HeatMapsReducer, 
  placeholder:ForecastPlaceholderReducer,
  numNotifs : NotificationsReducer,
  filteredAlerts: FilterReducer, 
  segment: SegmentReducer,
  sensor: SensorReducer,
  tank: TankReducer
});
export default rootReducer;
