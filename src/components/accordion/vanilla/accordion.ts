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
    this.buttonEl.addEventListener('click', () => this.setOpen(!this.open));
  }

  setOpen(nextOpen: boolean) {
    if (this.open === nextOpen) {
      return;
    }

    this.open = nextOpen;
    this.buttonEl.setAttribute('aria-expanded', String(nextOpen));
    this.panelEl.hidden = !nextOpen;
  }
}

document
  .querySelectorAll<HTMLButtonElement>('.accordion button[data-accordion-trigger]')
  .forEach((btn) => new AccordionSection(btn));
