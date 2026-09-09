import type { Tenant } from "@/types/rule-builder"

export const DEMO_TENANTS: Tenant[] = [
  { code: "AA", name: "American Airlines", hasFc: true },
  { code: "DL", name: "Delta Air Lines", hasFc: true },
  { code: "UA", name: "United Airlines", hasFc: true },
  { code: "BA", name: "British Airways", hasFc: true },
  { code: "AF", name: "Air France", hasFc: true },
  { code: "LH", name: "Lufthansa", hasFc: true },
  { code: "IB", name: "Iberia", hasFc: true },
  { code: "LA", name: "LATAM Airlines", hasFc: true },
  { code: "AV", name: "Avianca", hasFc: false },
  { code: "CM", name: "Copa Airlines", hasFc: true },
  { code: "AM", name: "Aeromexico", hasFc: false },
  { code: "AC", name: "Air Canada", hasFc: true },
]

function isTenant(value: unknown): value is Tenant {
  if (!value || typeof value !== "object") return false
  const tenant = value as Record<string, unknown>
  return (
    typeof tenant.code === "string" &&
    typeof tenant.name === "string" &&
    typeof tenant.hasFc === "boolean"
  )
}

export async function loadTenants(): Promise<Tenant[]> {
  const url = import.meta.env.VITE_TENANTS_URL as string | undefined
  const apiKey = import.meta.env.VITE_TENANTS_API_KEY as string | undefined

  if (!url) return DEMO_TENANTS

  const headers = new Headers()
  if (apiKey) headers.set("x-api-key", apiKey)

  const response = await fetch(url, { headers })
  if (!response.ok) {
    throw new Error(`Failed to load tenants (${response.status})`)
  }

  const payload: unknown = await response.json()
  if (!Array.isArray(payload)) return DEMO_TENANTS

  const tenants = payload.filter(isTenant)
  return tenants.length > 0 ? tenants : DEMO_TENANTS
}
