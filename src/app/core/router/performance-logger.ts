export function performanceLogger(reducer) {
  return (state, action) => {
    const t0 = performance.now();
    console.log(
      `%cSTORE:PERF%c ${action.type}`,
      'color:white; background-color: #8E388E; padding: 0 .5em;',
      '',
      reducer(state, action)
    );

    const t1 = performance.now();
    console.log(
      `%cSTORE:PERF%c ${action.type}`,
      'color:white; background-color: #8E388E; padding: 0 .5em;',
      '',
      `Computed in ${(t1 - t0).toFixed(0)} ms.`
    );

    return reducer(state, action);
  };
}
