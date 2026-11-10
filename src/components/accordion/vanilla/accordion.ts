class AccordionSection {
  buttonEl: HTMLButtonElement;
  panelEl: HTMLElement;
  open: boolean = false;
  constructor(buttonEl: HTMLButtonElement) {
    this.buttonEl = buttonEl;
    const panelId = this.buttonEl.getAttribute('aria-controls');
    if (!panelId) {
      throw new Error(
        `Button ${this.buttonEl.textContent.trim()} is missing aria-controls`,
      );
    }
    const panelEl = document.getElementById(panelId);
    if (!panelEl) {
      throw new Error(`Panel with id ${panelId} not found`);
    }
    this.panelEl = panelEl;
    this.open = this.buttonEl.getAttribute('aria-expanded') === 'true';
    this.buttonEl.addEventListener('click', () => this.toggle(!this.open));
  }

  toggle(open: boolean) {
    if (this.open === open) {
      return;
    }

    this.open = open;
    this.buttonEl.setAttribute('aria-expanded', String(open));
    this.panelEl.hidden = !open;
  }
}

document
  .querySelectorAll<HTMLButtonElement>('.accordion button[data-accordion-trigger]')
  .forEach((btn) => new AccordionSection(btn));
