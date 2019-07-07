<script>
  import { onMount } from "svelte";
  export let Controller;
  const { mutationCallback, state, renderChart, getScript } = Controller;
  const { chartKey: id, height, observerConfig, oneself, width } = state;

  onMount(() => {
    const observer = new MutationObserver(mutationCallback);
    const config = getScript(oneself);
    const canvas = document.querySelector(`#${id}`);
    const newState = { ...state, config, canvas };
    renderChart(newState);
    observer.observe(oneself, observerConfig);
  });
</script>

<div>
  <canvas {id} {width} {height} />
</div>
