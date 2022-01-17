import { css, html, LitElement } from 'lit';
import "../indicators/devtools-property-indicators.js";

export class DevToolsTextInput extends LitElement {
    static get properties() {
        return {
            placeholder: { type: String },
            value: { type: String, reflect: true },
            type: { type: String },
            label: { type: String },
            propertyPath: { type: Array },
            property: { type: Object },
        };
    }

    constructor() {
        super();

        this.placeholder = '';
        this.value = '';
        this.property = null;
        this.label = '';
        this.type = 'text';
        this.propertyPath = [];
    }

    _triggerInput(e) {
        e.stopPropagation();
        const value = e.target.value;

        this.dispatchEvent(
            new CustomEvent('devtools-input', {
                detail: { value, property: this.property, propertyPath: this.propertyPath },
                bubbles: true,
                composed: true,
            }),
        );
    }

    getValue() {
        return this.shadowRoot.querySelector('input').value;
    }

    render() {
        return html`${this.label.length > 0 ? html` <label>${this.label}:</label> ` : ''}
            <input
                @input=${e => this._triggerInput(e)}
                type="${this.type}"
                placeholder=${this.placeholder}
                .value=${this.value}
            />
            <devtools-property-indicators .property=${this.property}></devtools-property-indicators>
        `;
    }

    static get styles() {
        return css`
            :host {
                --font-size: 0.8rem;
                display: flex;
                justify-content: flex-start;
                align-items: center;
            }

            input {
                color: var(--button-color);
                background: var(--background-color);
                height: 100%;
                width: 100%;
                font-size: var(--font-size);
                border-radius: 4px;
                transition: 100ms ease-in-out;
                border: 1px solid var(--border-color);
                outline: none;
                margin-left: 1rem;
            }

            input:focus {
                border: 1px solid var(--highlight);
                background: var(--darker-background-hover-color);
            }

            label {
                font-size: 0.8rem;
                padding: 3px 0 3px 3px;
                color: var(--secondary);
                font-weight: 400;
                white-space: nowrap;
            }

            :host([nolabel]) input {
                flex-basis: 100%;
            }
            :host([nolabel]) label {
                flex-basis: 0;
            }
        `;
    }
}

if (!customElements.get('devtools-text-input')) {
    customElements.define('devtools-text-input', DevToolsTextInput);
}
