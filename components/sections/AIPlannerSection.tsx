import React from 'react';
import Section from '../Section';
import { useAIPlanner } from '../../hooks/useAIPlanner';
import PlannerControls from '../planner/PlannerControls';
import PlannerResults from '../planner/PlannerResults';
import { CelebrationAnimation } from '../planner/ui/CelebrationAnimation';
import { ProgressStepper } from '../planner/ui/ProgressStepper';

const AIPlannerSection = React.forwardRef<HTMLElement>((props, ref) => {
    const { state, actions } = useAIPlanner();

    return (
        <Section ref={ref} id="planner" title="Perencana Bisnis AI">
            <div className="no-print">
                {state.showCelebration && <CelebrationAnimation />}
            </div>
            <div className="w-full">
                <div className="no-print">
                    <ProgressStepper currentStage={state.stage} />
                    <PlannerControls
                        state={state}
                        actions={actions}
                    />
                </div>
                <PlannerResults
                    state={state}
                    actions={actions}
                />
            </div>
        </Section>
    );
});

AIPlannerSection.displayName = 'AIPlannerSection';

export default AIPlannerSection;