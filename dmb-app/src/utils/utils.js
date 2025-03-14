class Utils {
  ValidEmail(val) {
    if (!val) return false
    return val.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    )
  }
  MaskCpf(val) {
    if (val) {
      const formattedDoc = val
        .replace(/\D/g, '')
        .replace(/^(\d{3})?(\d{3})?(\d{3})?(\d{2})?/, '$1.$2.$3-$4')
      return formattedDoc
    }
    return ''
  }
  ValidCpf(val) {
    let cpf = val
    if (typeof cpf !== 'string') return false
    cpf = cpf.replace(/[\s.-]*/gim, '')
    if (
      !cpf ||
      cpf.length != 11 ||
      cpf == '00000000000' ||
      cpf == '11111111111' ||
      cpf == '22222222222' ||
      cpf == '33333333333' ||
      cpf == '44444444444' ||
      cpf == '55555555555' ||
      cpf == '66666666666' ||
      cpf == '77777777777' ||
      cpf == '88888888888' ||
      cpf == '99999999999'
    ) {
      return false
    }
    let add = 0
    let leftover
    for (let i = 1; i <= 9; i++) add = add + parseInt(cpf.substring(i - 1, i)) * (11 - i)
    leftover = (add * 10) % 11
    if (leftover == 10 || leftover == 11) leftover = 0
    if (leftover != parseInt(cpf.substring(9, 10))) return false
    add = 0
    for (let i = 1; i <= 10; i++) add = add + parseInt(cpf.substring(i - 1, i)) * (12 - i)
    leftover = (add * 10) % 11
    if (leftover == 10 || leftover == 11) leftover = 0
    if (leftover != parseInt(cpf.substring(10, 11))) return false
    return true
  }
  MaskCnpj(val) {
    if (val) {
      const formattedDoc = val
        .replace(/\D/g, '')
        .replace(/^(\d{2})(\d{3})?(\d{3})?(\d{4})?(\d{2})?/, '$1.$2.$3/$4-$5')
      return formattedDoc
    }
    return ''
  }
  ValidCnpj(val) {
    let cnpj = val
    let b = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    let c = String(cnpj).replace(/[^\d]/g, '')
    let i
    let n
    if (c.length !== 14) return false
    if (/0{14}/.test(c)) return false
    for (i = 0, n = 0; i < 12; n += c[i] * b[++i]);
    if (c[12] != ((n %= 11) < 2 ? 0 : 11 - n)) return false
    for (i = 0, n = 0; i <= 12; n += c[i] * b[i++]);
    if (c[13] != ((n %= 11) < 2 ? 0 : 11 - n)) return false
    return true
  }
  MaskPhone(val) {
    if (!val) return ''
    val = val.replace(/\D/g, '')
    val = val.replace(/(\d{2})(\d)/, '($1) $2')
    val = val.replace(/(\d)(\d{4})$/, '$1-$2')
    return val
  }
  ValidPhone(val) {
    if (val.length === 15 && val.at(5) == 9) {
      return true
    } else if (val.length === 14) {
      return true
    } else {
      return false
    }
  }
  MaskDate(val) {
    if (!val) return ''
    val = val.replace(/\D/g, '')
    val = val.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3')
    return val
  }
  ValidDate(val) {
    if (!val) return false
    if (val.length < 10) return false
    val = new Date(val)
    if (isNaN(val.getTime())) return false
    const today = new Date()
    if (val.getTime() > today.getTime()) return false
    return true
  }
  ValidPassword(val) {
    let regExp =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!#$%¨&*-_+=§^~:;,.])(?:([0-9a-zA-Z!#$%¨&*-_+=§^~:;,.])(?!\1)){8,}$/i
    const resp = regExp.test(val)
    return resp
  }
}
export default new Utils()
