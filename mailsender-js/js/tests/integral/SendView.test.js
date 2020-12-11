import SendView from '../../components/views/sendview/SendView';
import componentData from '../../../templates/template-datas/input-template-datas/send-input-data.json';
import containerData from '../../../templates/template-datas/input-template-datas/input-containers-data.json';
import FetchObserver from '../../FetchObserver';

jest.mock('../../FetchObserver');

beforeEach(() => {
	FetchObserver.mockClear();
});

describe('send view tests', () => {
	test('should render send view to target', () => {
		// given
		window.fetchObserver = new FetchObserver();
		const view = new SendView();
		// when
		view.renderTo(document.body);
		// then
		expect(document.body.innerHTML).not.toBe('');
		expect(document.body.id).toBe(containerData.send.articleId);

		const contentSpace = document.getElementById('input-content-space');
		expect(contentSpace.getElementsByTagName('textarea').length).toBe(1);
		expect(contentSpace.getElementsByTagName('input')[0].value).toBe(componentData.buttonValue);
	});
});