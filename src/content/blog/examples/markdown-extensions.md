---
title: 'Markdown Extensions'
description: 'Source and rendered examples of the Markdown extensions and custom styling available in Aevora.'
pubDate: 'Sep 23, 2024'
heroImage: './markdown-extensions.jpg'
bibliography: './markdown-extensions.bib'
series: ['Examples', 'Markdown']
---

These examples cover Aevora's Markdown extensions and custom article styling. Each source block is followed by its rendered result.

## Math

Use dollar signs for inline formulas and a pair of `$$` lines for display formulas.

```markdown
Each attention score is scaled by $\sqrt{d_k}$.

$$
\operatorname{Attention}(Q,K,V)
= \operatorname{softmax}\!\left(\frac{QK^\top}{\sqrt{d_k}}\right)V.
$$
```

Each attention score is scaled by $\sqrt{d_k}$.

$$
\operatorname{Attention}(Q,K,V)
= \operatorname{softmax}\!\left(\frac{QK^\top}{\sqrt{d_k}}\right)V.
$$

Long display formulas scroll horizontally within the article. This expression stays on one line so you can scroll to see the complete formula.

```markdown
$$
\log p_\theta(x)
= \log \mathbb{E}_{z \sim q_\phi(z \mid x)}\!\left[\frac{p_\theta(x,z)}{q_\phi(z \mid x)}\right]
\ge \mathbb{E}_{z \sim q_\phi(z \mid x)}\!\left[\log\frac{p_\theta(x,z)}{q_\phi(z \mid x)}\right]
= \mathbb{E}_{z \sim q_\phi(z \mid x)}\!\left[\log p_\theta(x \mid z)\right]
- D_{\mathrm{KL}}\!\left(q_\phi(z \mid x)\,\|\,p_\theta(z)\right).
$$
```

$$
\log p_\theta(x)
= \log \mathbb{E}_{z \sim q_\phi(z \mid x)}\!\left[\frac{p_\theta(x,z)}{q_\phi(z \mid x)}\right]
\ge \mathbb{E}_{z \sim q_\phi(z \mid x)}\!\left[\log\frac{p_\theta(x,z)}{q_\phi(z \mid x)}\right]
= \mathbb{E}_{z \sim q_\phi(z \mid x)}\!\left[\log p_\theta(x \mid z)\right]
- D_{\mathrm{KL}}\!\left(q_\phi(z \mid x)\,\|\,p_\theta(z)\right).
$$

## Alerts

GitHub-style alerts support `NOTE`, `TIP`, `IMPORTANT`, `WARNING`, and `CAUTION`.

```markdown
> [!NOTE]
> Keep the model's assumptions next to the result.

> [!TIP]
> Put a short explanation before a long derivation.
```

> [!NOTE]
> Keep the model's assumptions next to the result.

> [!TIP]
> Put a short explanation before a long derivation.

## Emoji

GitHub emoji shortcodes work in prose and remain literal inside code.

```markdown
Experiment complete :tada: Ready for review :+1:
```

Experiment complete :tada: Ready for review :+1:

## Code Annotations

A filename, line numbers, and highlighted lines can be added to a fenced code block. More options are shown in the [Expressive Code examples](/blog/examples/expressive-code-examples/).

````markdown
```python title="attention.py" showLineNumbers {2}
def attention(query, key, value):
    scores = query @ key.T / query.shape[-1] ** 0.5
    return scores.softmax(dim=-1) @ value
```
````

```python title="attention.py" showLineNumbers {2}
def attention(query, key, value):
    scores = query @ key.T / query.shape[-1] ** 0.5
    return scores.softmax(dim=-1) @ value
```

## Figure Captions

Wrap an image in `<figure>` and add a `<figcaption>`. The caption receives a figure number automatically. Leave a blank line after the opening `<figcaption>` tag and before the closing `</figcaption>` tag so Markdown formatting, such as inline code and math, renders correctly inside the caption.

```markdown
<figure>
  <img width="600" src="/placeholder-images/jagged.jpg" alt="Placeholder Image" />
  <figcaption>

  A caption with an automatically generated figure number.

  </figcaption>
</figure>
```

<figure>
  <img width="600" src="/placeholder-images/jagged.jpg" alt="Placeholder Image" />
  <figcaption>

  A caption with an automatically generated figure number.

  </figcaption>
</figure>

## Collapsible Details

Use native HTML for a collapsible explanation. Select the summary to open it.

```html
<details>
  <summary>Why scale the attention scores?</summary>
  <p>Scaling helps keep dot products from growing with the key dimension.</p>
</details>
```

<details>
  <summary>Why scale the attention scores?</summary>
  <p>Scaling helps keep dot products from growing with the key dimension.</p>
</details>

## Citations

Add `bibliography: './markdown-extensions.bib'` to the article's frontmatter, then cite BibTeX keys with `:cite`. Numbers follow first appearance and link to the generated reference list. Repeated citations reuse their number. A group displays its numbers in ascending order.

```markdown
The Transformer uses attention :cite[vaswani2017attention].
BERT builds on Transformer encoders :cite[devlin2019bertpretrainingdeepbidirectional].
Read both papers :cite[devlin2019bertpretrainingdeepbidirectional; vaswani2017attention],
or a specific section :cite[vaswani2017attention]{locator="Section 3.2"}.
```

The Transformer uses attention :cite[vaswani2017attention].
BERT builds on Transformer encoders :cite[devlin2019bertpretrainingdeepbidirectional].
Read both papers :cite[devlin2019bertpretrainingdeepbidirectional; vaswani2017attention],
or a specific section :cite[vaswani2017attention]{locator="Section 3.2"}.

To include the entire bibliography, add `::nocite[*]` on its own line. The uncited *Deep Learning* book appears after the cited papers in the generated References section.

```markdown
::nocite[*]
```

::nocite[*]
