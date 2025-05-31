// Page configuration - Easy to add new pages here!
// Import all page components
import NumberLineFractionApp from '../components/pages/NumberLineFractionApp';
import CakeFractionApp from '../components/pages/CakeFractionApp';
import ClockLearningApp from '../components/pages/ClockLearningApp';
import MoneyCalculationApp from '../components/pages/MoneyCalculationApp';

export const PAGES = [
    {
        id: 'numberline',
        name: 'Number Line Fractions',
        component: NumberLineFractionApp
    },
    {
        id: 'cake',
        name: 'Cake Fractions',
        component: CakeFractionApp
    },
    {
        id: 'clock',
        name: 'Clock',
        component: ClockLearningApp
    },
    {
        id: 'money',
        name: 'Money Problems',
        component: MoneyCalculationApp
    }
    // Add new pages here!
];