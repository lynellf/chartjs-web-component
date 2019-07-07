import ChartView from './ChartView.svelte'
import ChartController from './ChartController'
import 'chart.js'

class ChartModel {
	constructor(element, index) {
		const oneself = element
		const observerConfig = { attributes: true, childList: true, subtree: true }
		const height = element.getAttribute('height')
		const width = element.getAttribute('width')
		const chartKey = `__chart${index}__`
		this.initialState = {
			canvas: undefined,
			chart: undefined,
			chartKey,
			config: undefined,
			height,
			observerConfig,
			oneself,
			width
		}
		this.renderView = this.renderView.bind(this)
	}
	renderView() {
		const { initialState } = this
		const { oneself } = initialState
		const Controller = new ChartController(initialState)
		return new ChartView({
			target: oneself,
			props: {
				Controller
			}
		})
	}
}

const targets = [ ...document.querySelectorAll('chart') ]

const charts = targets.map((element, index) => new ChartModel(element, index).renderView())

export default charts
