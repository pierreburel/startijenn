---
title: Settings
---

## Colors

Key | Value | Preview
----|-------|--------
{{#each colors}}
  `{{ @key }}` | {{ this }} | <div style="background-color: {{ this }}; border-radius: 3px; width: 2em; height: 2em;"></div>
{{/each}}


## Font families

Key | Value
----|------
{{#each font-families}}
  `{{ @key }}` | <span style="font-family: {{ this }}">{{ this }}</span>
{{/each}}


## Font weights

Key | Value
----|------
{{#each font-weights}}
  `{{ @key }}` | <span style="font-weight: {{ this }}">{{ this }}</span>
{{/each}}


## Line heights

Key | Value
----|------
{{#each line-heights}}
  `{{ @key }}` | <span style="line-height: {{ this }}">{{ this }}</span>
{{/each}}

## Dimensions

Key | Value
----|------
{{#each dimensions}}
  `{{ @key }}` | {{ this }}
{{/each}}

## Z-indexes

Key | Value
----|------
{{#each z-indexes}}
  `{{ @key }}` | {{ this }}
{{/each}}

## Breakpoints

Key | Value
----|------
{{#each breakpoints}}
  `{{ @key }}` | {{ this }}
{{/each}}
