import { memo } from 'react';
import { SourceBox } from './SourceBox';
import TargetBox from './TargetBox';
import { Colors } from './Colors';
export const Container = memo(function Container() {
    return (<>
			<div style={{ overflow: 'hidden', clear: 'both', margin: '-.5rem' }}>
				<div style={{ float: 'left' }}>
					<SourceBox color={Colors.BLUE} id="1">
						<SourceBox color={Colors.YELLOW} id="2">
							<SourceBox color={Colors.YELLOW} id="3"/>
							<SourceBox color={Colors.BLUE} id="4"/>
						</SourceBox>
						<SourceBox color={Colors.BLUE} id="5">
							<SourceBox color={Colors.YELLOW} id="6"/>
						</SourceBox>
					</SourceBox>
				</div>

				<div style={{ float: 'left', marginLeft: '5rem', marginTop: '.5rem' }}>
					<TargetBox />
				</div>
			</div>
		</>);
});
