import 'chart.js'
import _ from 'lodash'

class ChartController {
	constructor(state) {
		this.compareConfig = this.compareConfig.bind(this)
		this.createChart = this.createChart.bind(this)
		this.getDataAttribute = this.getDataAttribute.bind(this)
		this.getScript = this.getScript.bind(this)
		this.handleMutation = this.handleMutation.bind(this)
		this.isJson = this.isJson.bind(this)
		this.mutationCallback = this.mutationCallback.bind(this)
		this.parseChartDataFromScript = this.parseChartDataFromScript.bind(this)
		this.renderChart = this.renderChart.bind(this)
		this.renderChartFromConfigAttribute = this.renderChartFromConfigAttribute.bind(this)
		this.setState = this.setState.bind(this)
		this.state = { ...state }
		this.validateScripts = this.validateScripts.bind(this)
	}
	compareConfig(newState) {
		const currentConfig = this.state.config
		const newConfig = newState.config
		return !_.isEqual(currentConfig, newConfig)
	}
	createChart(canvas, config) {
		const { state, setState } = this
		const { chart: oldChart } = state
		const hasOldchart = oldChart !== undefined && oldChart !== null
		if (hasOldchart) oldChart.destroy()
		const context = canvas.getContext('2d')
		const chart = new Chart(context, config)
		setState({ ...state, canvas, chart, config })
	}
	getDataAttribute(node) {
		const json = node.getAttribute('config')
		const data = JSON.parse(json)
		return data
	}
	getScript(node) {
		const { getDataAttribute, parseChartDataFromScript, validateScripts } = this
		const children = [ ...node.children ]
		const scriptList = children.filter((childNode) => validateScripts(childNode))
		const hasScript = scriptList.length > 0
		if (!hasScript) return getDataAttribute(node)
		if (hasScript) return parseChartDataFromScript(scriptList)
	}
	handleMutation(mutation) {
		const { getScript, renderChartFromConfigAttribute, renderChart, state } = this
		const { oneself } = state
		const { addedNodes: added, attributeName, type } = mutation
		const addedNodes = [ ...added ]
		const addedScripts = addedNodes.filter((node) => node.tagName.toLowerCase() === 'script')
		const isAddedScripts = addedScripts.length > 0
		const isAttributes = type === 'attributes'
		const incomingConfig = getScript(oneself)
		if (isAttributes) renderChartFromConfigAttribute(attributeName, incomingConfig)
		if (isAddedScripts) renderChart({ ...this.state, config: incomingConfig })
	}
	isJson(string) {
		const stringLower = string.toLowerCase()
		const isJson = stringLower.includes('json')
		if (!isJson) return false
		if (isJson) return true
	}
	mutationCallback(mutationList, _observer) {
		mutationList.forEach((mutation) => this.handleMutation(mutation))
	}
	parseChartDataFromScript(scriptArray) {
		const script = scriptArray[0]
		const json = script.innerHTML
		const data = JSON.parse(json)
		return data
	}
	renderChartFromConfigAttribute(attributeName, incomingConfig) {
		const { renderChart, state } = this
		const attributeNameLower = attributeName.toLowerCase()
		const isConfigAttribute = attributeNameLower === 'config'
		if (isConfigAttribute) renderChart({ ...state, config: incomingConfig })
	}
	renderChart(incomingState) {
		const { compareConfig, createChart } = this
		const { config, canvas } = incomingState
		const isNewChart = compareConfig(incomingState)
		if (isNewChart) createChart(canvas, config)
	}
	setState(incomingState) {
		const { state } = this
		this.state = { ...state, ...incomingState }
	}
	validateScripts(node) {
		const tagName = node.tagName
		const type = node.getAttribute('type')
		const isScript = tagName.toLowerCase() === 'script'
		const hasType = type !== null && type !== undefined
		if (isScript && hasType) return this.isJson(type)
		return false
	}
}
export default ChartController
