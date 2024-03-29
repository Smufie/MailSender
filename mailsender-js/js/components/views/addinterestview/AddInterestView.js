/* eslint-disable no-param-reassign */
import InputContainerFactory from '../../../containers/InputContainerFactory';
import AddInterestComponent from './AddInterestComponent';
import AddInterestButtonListener from './AddInterestButtonListener';

export default class AddInterestView {
	constructor() {
		this.container = InputContainerFactory.getAddInterestContainer();
		this.input = new AddInterestComponent();
	}

	renderTo(target) {
		target.innerHTML = this.container.generatedHTML;
		target.id = this.container.id;
		attachInputToContainer(this.input);
		listenAddInterestButton();
		return target.innerHTML;
	}
}

function attachInputToContainer(input) {
	const contentSpace = document.getElementById('input-content-space');
	contentSpace.innerHTML += input.generatedHTML;
	return contentSpace.innerHTML;
}

function listenAddInterestButton() {
	const addInterestButtonListener = new AddInterestButtonListener();
	addInterestButtonListener.listen();
}
