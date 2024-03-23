import { start, stop } from '../functions/projectControl';

export default function StartButton({ state }) {
  if (!state.running) {
    return (
      <button
        className="button button-blue"
        type="button"
        onClick={(e) => {
          start(e, state.path, state.id);
        }}
      >
        Start
      </button>
    );
  }
  return (
    <button
      className="button button-blue"
      type="button"
      onClick={(e) => {
        stop(e, state.path, state.id);
      }}
    >
      Stop
    </button>
  );
}
