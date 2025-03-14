class Providers {
  route
  constructor() {
    this.route = import.meta.env.VITE_API_URL
  }
  async GetRegistration(id) {
    return await fetch(`${this.route}/registration/${id}`)
  }
  async SetRegistration(data) {
    const params = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
    return await fetch(`${this.route}/registration`, params)
  }
}
export default new Providers()
