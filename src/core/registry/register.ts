import type { DomainManifest } from "@/core/registry/types"

const domains = new Map<string, DomainManifest>()

export function registerDomain(manifest: DomainManifest) {
  domains.set(manifest.id, manifest)
}

export function getDomain(id: string) {
  return domains.get(id)
}

export function requireDomain(id: string) {
  const domain = getDomain(id)
  if (!domain) {
    throw new Error(`Unknown domain: ${id}`)
  }
  return domain
}

export function listDomains() {
  return [...domains.values()]
}
