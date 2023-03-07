import bcrypt from 'bcrypt'

class HashPassword{
    async hash(password){
        return await bcrypt.hash(password,10)
    }
    matchPassword(password, dbPassword){
        return bcrypt.compare(password, dbPassword)
    }
}

export default new HashPassword();