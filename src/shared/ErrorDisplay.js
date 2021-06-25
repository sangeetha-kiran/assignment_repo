import { Card, Result } from 'antd';

const ErrorDisplay = props => {
	return (
		<Card title={props.title}>
			<Result status="warning" title={props.content} />
		</Card>
	);
};

export default ErrorDisplay;
