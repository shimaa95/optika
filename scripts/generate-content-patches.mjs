#!/usr/bin/env node
/** Generate patch_documents payloads from seed chunk files. */
import fs from 'node:fs'
import path from 'node:path'

const dir = path.resolve(import.meta.dirname, 'mcp-phases')
const transition = JSON.parse(fs.readFileSync(path.join(dir, '.transition.json'), 'utf8'))[0].content
const solutions = JSON.parse(fs.readFileSync(path.join(dir, '.solutions.json'), 'utf8'))[0].content

const { _id: _t, title: _tt, seo: _ts, hero: _th, ...transitionRest } = transition
const { _id: _s, title: _st, seo: _ss, hero: _sh, ...solutionsRest } = solutions

const patches = {
  transitionPage: { patches: [{ set: transitionRest }] },
  solutionsPage: { patches: [{ set: solutionsRest }] },
}

fs.writeFileSync(path.join(dir, 'patch-transition-solutions.json'), JSON.stringify(patches), 'utf8')
console.log('wrote patch-transition-solutions.json')
