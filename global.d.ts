// говорим TypeScript, что существует модуль '@google/model-viewer'
declare module '@google/model-viewer';

// добавляем в JSX новый тег <model-viewer>
declare namespace JSX {
  interface IntrinsicElements {
    "model-viewer": any;
  }
}
