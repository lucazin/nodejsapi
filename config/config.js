const env = process.env.NODE_ENV || 'dev';

const config = () => {
    {

        switch (env) {
            case 'dev':
                return {

                    bd_String: 'mongodb+srv://----',
                    jwtpass: 'lucasbergamo',
                    jwt_expires: '7d'
                }

            case 'hml':
                return {

                    bd_String: 'mongodb+srv://----',
                    jwtpass: 'homolo',
                    jwt_expires: '7d'
                }

            case 'prod':
                return {

                    bd_String: 'mongodb+srv://----',
                    jwtpass: 'dwqpdqwodqiod092dsa',
                    jwt_expires: '7d'
                }
        }
    }
}

console.log("Iniciando a API em ambiente " + (env.toUpperCase()));
module.exports = config();