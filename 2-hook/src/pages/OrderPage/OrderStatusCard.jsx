import Card from '../../components/Card';
import Button from '../../components/Button';
import { useDialog } from '../../lib/MyLayout';
import Dialog from '../../components/Dialog';
import { memo, useCallback, useMemo } from 'react';

const OrderStatusCard = ({ order }) => {
	console.log('OrderStatusCard')
	const { status, name, orderDate, position, id } = order;
	const { openDialog, closeDialog } = useDialog();

	const calculateDeliveryMinute = () => {
		console.log('calculateDeliveryMinute')
		for (let i = 0; i < 99999; i++) {
		}

		if (!position[0]) return '-';
		return `${position[0]}분`;
	};

	const expectedDeliveryMinute = useMemo(() => calculateDeliveryMinute(), [position[0]]);

	const handleClick = useCallback(() => {
		openDialog(
			<Dialog footer={ <Button onClick={closeDialog}>확인</Button> }>
				<ul>
					<li>위도: {position[0]}</li>
					<li>경도: {position[1]}</li>
				</ul>
			</Dialog>
		);
	}, [position[0], position[1]]);

	return (
		<Card
			header={
				<>
					<strong>{ status }</strong>
					<br />
					{ name }
				</>
			}
			data={[
				{term: '주문일시', description: orderDate},
				{term: '주문번호', description: id},
				{term: '도착 예상 시간', description: <ExpectedDeliveryMinute value={expectedDeliveryMinute} onClick={handleClick} />}
			]}
			footer={
				<>
					<Button>전화</Button>
					<Button>가게보기</Button>
				</>
			}
		/>
	);
}

export default OrderStatusCard;

const ExpectedDeliveryMinute = memo(({ value, onClick}) => {
	console.log('ExpectedDeliveryMinute');
	return (
		<>
			{ value }
			<Button onClick={onClick}>위치보기</Button>
		</>
	);
});
