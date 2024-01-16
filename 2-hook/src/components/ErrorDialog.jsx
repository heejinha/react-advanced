import Button from './Button';
import { useDialog } from '../lib/MyLayout';
import Dialog from './Dialog';

const ErrorDialog = () => {
	const { closeDialog } = useDialog();

	return (
		<Dialog
			header={<>오류</>}
			footer={<Button onClick={() => closeDialog()}>확인</Button>}
		>
			잠시 후 다시 시도해 주세요.
		</Dialog>
	)
};

export default ErrorDialog;
