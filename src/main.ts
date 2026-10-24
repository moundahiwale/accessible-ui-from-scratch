import './styles/main.scss';

const app = document.querySelector<HTMLDivElement>('#app');

if (app) {
  app.innerHTML = `
    <main>
      <h1>Accessible UI from scratch</h1>
      <p>Components and utilities built with TypeScript, Angular and React.</p>
      <button type="button">Focusable button</button>
      <a href="https://github.com/moundahiwale/accessible-ui-from-scratch">View on GitHub</a>
      <div>
        <img src="/favicon.svg" alt="favicon">
      </div>
    </main>
  `;
}