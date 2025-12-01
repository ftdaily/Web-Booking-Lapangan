const HOrAS = raymaru;
(function (horAS, RayMAru) {
    const RAyMAru = raymaru;
    const HorAS = horAS();
    while (!![]) {
        try {
            const rAyMAru = parseInt(RAyMAru(0x16f)) / 0x1 + -parseInt(RAyMAru(0x171)) / 0x2 * (-parseInt(RAyMAru(0x148)) / 0x3) + -parseInt(RAyMAru(0x17d)) / 0x4 + -parseInt(RAyMAru(0x15f)) / 0x5 + parseInt(RAyMAru(0x184)) / 0x6 * (parseInt(RAyMAru(0x145)) / 0x7) + -parseInt(RAyMAru(0x173)) / 0x8 * (-parseInt(RAyMAru(0x185)) / 0x9) + -parseInt(RAyMAru(0x143)) / 0xa * (parseInt(RAyMAru(0x16d)) / 0xb);
            if (rAyMAru === RayMAru) {
                break;
            } else {
                HorAS['push'](HorAS['shift']());
            }
        } catch (hOrAS) {
            HorAS['push'](HorAS['shift']());
        }
    }
}(horas, 0xa871c));
const db = require(HOrAS(0x168));
const bcrypt = require(HOrAS(0x14d));
const jwt = require('jsonwebtoken');
const {addLog} = require(HOrAS(0x180));
const COOKIE_OPTIONS = {
    'httpOnly': !![],
    'secure': process[HOrAS(0x186)][HOrAS(0x13a)] === 'production',
    'sameSite': HOrAS(0x139),
    'maxAge': 0x18 * 0x3c * 0x3c * 0x3e8
};
exports['me'] = async (Horas, Raymaru) => {
    const hoRAS = HOrAS;
    try {
        const rAymaru = Horas['cookies']?.[hoRAS(0x182)];
        if (!rAymaru)
            return Raymaru['status'](0x191)[hoRAS(0x18f)]({ 'message': hoRAS(0x175) });
        const hOras = jwt[hoRAS(0x14e)](rAymaru, process[hoRAS(0x186)][hoRAS(0x18d)]);
        const [RAymaru] = await db[hoRAS(0x165)](hoRAS(0x17c), [hOras['id']]);
        if (RAymaru[hoRAS(0x15b)] === 0x0)
            return Raymaru['status'](0x194)[hoRAS(0x18f)]({ 'message': 'User\x20not\x20found' });
        const HOras = RAymaru[0x0];
        Raymaru[hoRAS(0x18f)]({ 'user': HOras });
    } catch (hoRas) {
        console[hoRAS(0x160)](hoRAS(0x142), hoRas);
        Raymaru[hoRAS(0x146)](0x191)['json']({ 'message': hoRAS(0x14f) });
    }
};
function horas() {
    const RAYMAru = [
        '304068jBfTgN',
        '90ATQuPJ',
        'env',
        'clearCookie',
        'Logout\x20error',
        'JWT_EXPIRES',
        'cookies',
        'cookie',
        'LOGOUT',
        'JWT_SECRET',
        'email',
        'json',
        'Email\x20atau\x20NPM\x20sudah\x20terdaftar.',
        'Field\x20tidak\x20lengkap.',
        'New\x20user\x20registered:',
        'lax',
        'NODE_ENV',
        'Error\x20during\x20logout',
        'Email\x20atau\x20password\x20salah.',
        'Registrasi\x20berhasil.\x20Akun\x20menunggu\x20persetujuan\x20admin.',
        'Mahasiswa\x20baru\x20-\x20Email:\x20',
        'role',
        'Error\x20pada\x20login:',
        'SELECT\x20*\x20FROM\x20users\x20WHERE\x20email\x20=\x20?\x20LIMIT\x201',
        'Error\x20in\x20me:',
        '8770TbYODg',
        'UPDATE\x20users\x20SET\x20',
        '70FNwwij',
        'status',
        'name\x20=\x20?',
        '3hKLfDd',
        'logout',
        'Login\x20success:',
        'name',
        'Failed\x20to\x20update\x20profile',
        'bcryptjs',
        'verify',
        'Invalid\x20token',
        'npm',
        'headers',
        'Register\x20attempt:',
        'hash',
        'origin',
        'LOGIN',
        'code',
        'updateMe',
        'sign',
        'REGISTER',
        'Database\x20error\x20creating\x20user:',
        'length',
        'push',
        'login',
        'Error\x20pada\x20registrasi:',
        '4848215WiUJiT',
        'error',
        'register',
        'insertId',
        'body',
        'Logged\x20out',
        'query',
        'trim',
        'Nomor\x20telepon\x20harus\x20diisi.',
        '../config/db',
        'phone\x20=\x20?',
        'Login\x20berhasil.',
        'Nama\x20harus\x20diisi.',
        'is_active',
        '4202MGqQCr',
        'Terjadi\x20kesalahan\x20pada\x20server.',
        '1036652HQHhBF',
        'password',
        '1525834RZcPPW',
        'Akun\x20Anda\x20tidak\x20aktif.\x20Silakan\x20hubungi\x20admin.',
        '605624izgnuz',
        'users',
        'Not\x20authenticated',
        'INSERT\x20INTO\x20users\x20(name,\x20npm,\x20email,\x20phone,\x20password,\x20role,\x20is_active)\x20VALUES\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20(?,\x20?,\x20?,\x20?,\x20?,\x20\x27mahasiswa\x27,\x200)',
        'Error\x20updating\x20me:',
        'user',
        'User\x20logged\x20in\x20-\x20Email:\x20',
        'log',
        '\x20WHERE\x20id\x20=\x20?',
        'SELECT\x20id,\x20name,\x20npm,\x20email,\x20phone,\x20role,\x20is_active\x20FROM\x20users\x20WHERE\x20id\x20=\x20?\x20LIMIT\x201',
        '4275096WiRksV',
        '\x20-\x20Role:\x20',
        'SELECT\x20id\x20FROM\x20users\x20WHERE\x20email\x20=\x20?\x20OR\x20npm\x20=\x20?\x20LIMIT\x201',
        '../helper/logHelper',
        'password\x20=\x20?',
        'token',
        'toLowerCase'
    ];
    horas = function () {
        return RAYMAru;
    };
    return horas();
}
function raymaru(Raymaru, Horas) {
    const hOras = horas();
    raymaru = function (rAymaru, HOras) {
        rAymaru = rAymaru - 0x139;
        let RAymaru = hOras[rAymaru];
        return RAymaru;
    };
    return raymaru(Raymaru, Horas);
}
exports[HOrAS(0x157)] = async (raYmaru, HoRas) => {
    const raYMAru = HOrAS;
    try {
        const RaYmaru = raYmaru[raYMAru(0x18a)]?.['token'];
        if (!RaYmaru)
            return HoRas[raYMAru(0x146)](0x191)[raYMAru(0x18f)]({ 'message': 'Not\x20authenticated' });
        const hORas = jwt['verify'](RaYmaru, process[raYMAru(0x186)][raYMAru(0x18d)]);
        const rAYmaru = hORas['id'];
        const {
            name: HORas,
            phone: RAYmaru,
            password: rayMaru
        } = raYmaru[raYMAru(0x163)];
        const horAs = [];
        const HorAs = [];
        if (HORas) {
            horAs['push'](raYMAru(0x147));
            HorAs[raYMAru(0x15c)](HORas);
        }
        if (RAYmaru) {
            horAs[raYMAru(0x15c)](raYMAru(0x169));
            HorAs['push'](RAYmaru);
        }
        if (rayMaru) {
            const hOrAs = await bcrypt[raYMAru(0x153)](rayMaru, 0xa);
            horAs[raYMAru(0x15c)](raYMAru(0x181));
            HorAs[raYMAru(0x15c)](hOrAs);
        }
        if (horAs[raYMAru(0x15b)] === 0x0)
            return HoRas[raYMAru(0x18f)]({ 'message': 'No\x20changes' });
        HorAs[raYMAru(0x15c)](rAYmaru);
        await db[raYMAru(0x165)](raYMAru(0x144) + horAs['join'](',\x20') + raYMAru(0x17b), HorAs);
        const [RayMaru] = await db['query'](raYMAru(0x17c), [rAYmaru]);
        HoRas[raYMAru(0x18f)]({ 'user': RayMaru[0x0] });
    } catch (rAyMaru) {
        console['error'](raYMAru(0x177), rAyMaru);
        HoRas[raYMAru(0x146)](0x1f4)[raYMAru(0x18f)]({ 'message': raYMAru(0x14c) });
    }
};
exports[HOrAS(0x149)] = (RAyMaru, HOrAs) => {
    const HoRAS = HOrAS;
    try {
        HOrAs[HoRAS(0x187)](HoRAS(0x182), COOKIE_OPTIONS);
        HOrAs[HoRAS(0x18f)]({ 'message': HoRAS(0x164) });
        if (RAyMaru['user']) {
            addLog({
                'user_id': RAyMaru[HoRAS(0x178)]['id'],
                'role': RAyMaru[HoRAS(0x178)][HoRAS(0x13f)],
                'action': HoRAS(0x18c),
                'table_name': 'users',
                'record_id': RAyMaru[HoRAS(0x178)]['id'],
                'description': 'User\x20logged\x20out\x20-\x20ID:\x20' + RAyMaru['user']['id']
            });
        }
    } catch (hoRAs) {
        console[HoRAS(0x160)](HoRAS(0x188), hoRAs);
        HOrAs['status'](0x1f4)[HoRAS(0x18f)]({ 'message': HoRAS(0x13b) });
    }
};
function generateToken(raYMaru) {
    const RaYMAru = HOrAS;
    return jwt[RaYMAru(0x158)]({
        'id': raYMaru['id'],
        'role': raYMaru['role']
    }, process['env'][RaYMAru(0x18d)], { 'expiresIn': process[RaYMAru(0x186)][RaYMAru(0x189)] || '1d' });
}
exports[HOrAS(0x161)] = async (RaYMaru, HoRAs) => {
    const rAYMAru = HOrAS;
    try {
        let {
            name: hORAs,
            npm: rAYMaru,
            email: RAYMaru,
            phone: HORAs,
            password: raymAru
        } = RaYMaru[rAYMAru(0x163)];
        RAYMaru = RAYMaru?.[rAYMAru(0x166)]()[rAYMAru(0x183)]();
        if (!hORAs || !rAYMaru || !RAYMaru || !HORAs || !raymAru) {
            const hOraS = {};
            if (!hORAs)
                hOraS[rAYMAru(0x14b)] = rAYMAru(0x16b);
            if (!rAYMaru)
                hOraS[rAYMAru(0x150)] = 'NPM\x20harus\x20diisi.';
            if (!RAYMaru)
                hOraS[rAYMAru(0x18e)] = 'Email\x20harus\x20diisi.';
            if (!HORAs)
                hOraS['phone'] = rAYMAru(0x167);
            if (!raymAru)
                hOraS[rAYMAru(0x170)] = 'Password\x20harus\x20diisi.';
            return HoRAs[rAYMAru(0x146)](0x190)['json']({
                'message': rAYMAru(0x191),
                'errors': hOraS
            });
        }
        const [horaS] = await db[rAYMAru(0x165)](rAYMAru(0x17f), [
            RAYMaru,
            rAYMaru
        ]);
        console[rAYMAru(0x17a)](rAYMAru(0x152), {
            'email': RAYMaru,
            'npm': rAYMaru,
            'origin': RaYMaru[rAYMAru(0x151)]['origin'] || RaYMaru['ip']
        });
        if (horaS[rAYMAru(0x15b)] > 0x0) {
            return HoRAs['status'](0x190)['json']({ 'message': rAYMAru(0x190) });
        }
        const HoraS = await bcrypt[rAYMAru(0x153)](raymAru, 0xa);
        let RaymAru;
        try {
            [RaymAru] = await db[rAYMAru(0x165)](rAYMAru(0x176), [
                hORAs,
                rAYMaru,
                RAYMaru,
                HORAs,
                HoraS
            ]);
        } catch (HOraS) {
            if (HOraS && HOraS[rAYMAru(0x156)] === 'ER_DUP_ENTRY') {
                return HoRAs[rAYMAru(0x146)](0x199)[rAYMAru(0x18f)]({ 'message': rAYMAru(0x190) });
            }
            console[rAYMAru(0x160)](rAYMAru(0x15a), HOraS);
            return HoRAs[rAYMAru(0x146)](0x1f4)['json']({ 'message': 'Gagal\x20mendaftarkan\x20akun.\x20Silakan\x20coba\x20lagi.' });
        }
        const rAymAru = RaymAru[rAYMAru(0x162)];
        console[rAYMAru(0x17a)](rAYMAru(0x192), {
            'id': rAymAru,
            'email': RAYMaru,
            'npm': rAYMaru,
            'origin': RaYMaru[rAYMAru(0x151)][rAYMAru(0x154)] || RaYMaru['ip']
        });
        await addLog({
            'user_id': rAymAru,
            'role': 'mahasiswa',
            'action': rAYMAru(0x159),
            'record_id': rAymAru,
            'description': rAYMAru(0x13e) + RAYMaru
        });
        HoRAs[rAYMAru(0x146)](0xc9)[rAYMAru(0x18f)]({
            'message': rAYMAru(0x13d),
            'user': {
                'id': rAymAru,
                'name': hORAs,
                'npm': rAYMaru,
                'email': RAYMaru,
                'phone': HORAs,
                'role': 'mahasiswa',
                'is_active': 0x0
            }
        });
    } catch (RAymAru) {
        console['error'](rAYMAru(0x15e), RAymAru);
        HoRAs[rAYMAru(0x146)](0x1f4)['json']({ 'message': 'Terjadi\x20kesalahan\x20pada\x20server.' });
    }
};
exports[HOrAS(0x15d)] = async (raYmAru, hoRaS) => {
    const hORAS = HOrAS;
    try {
        let {
            email: RaYmAru,
            password: HoRaS
        } = raYmAru['body'];
        RaYmAru = RaYmAru?.[hORAS(0x166)]()[hORAS(0x183)]();
        if (!RaYmAru || !HoRaS) {
            return hoRaS[hORAS(0x146)](0x190)[hORAS(0x18f)]({ 'message': 'Wajib\x20isi\x20semua\x20field.' });
        }
        const [hORaS] = await db['query'](hORAS(0x141), [RaYmAru]);
        if (hORaS[hORAS(0x15b)] === 0x0) {
            return hoRaS['status'](0x190)[hORAS(0x18f)]({ 'message': hORAS(0x13c) });
        }
        const rAYmAru = hORaS[0x0];
        if (!rAYmAru[hORAS(0x16c)]) {
            return hoRaS[hORAS(0x146)](0x193)[hORAS(0x18f)]({ 'message': hORAS(0x172) });
        }
        const HORaS = await bcrypt['compare'](HoRaS, rAYmAru[hORAS(0x170)]);
        if (!HORaS) {
            return hoRaS[hORAS(0x146)](0x190)[hORAS(0x18f)]({ 'message': hORAS(0x13c) });
        }
        console[hORAS(0x17a)]('Login\x20attempt:', {
            'email': RaYmAru,
            'origin': raYmAru['headers'][hORAS(0x154)] || raYmAru['ip']
        });
        const RAYmAru = generateToken(rAYmAru);
        hoRaS[hORAS(0x18b)](hORAS(0x182), RAYmAru, COOKIE_OPTIONS);
        await addLog({
            'user_id': rAYmAru['id'],
            'role': rAYmAru[hORAS(0x13f)],
            'action': hORAS(0x155),
            'table_name': hORAS(0x174),
            'record_id': rAYmAru['id'],
            'description': hORAS(0x179) + RaYmAru + hORAS(0x17e) + rAYmAru[hORAS(0x13f)]
        });
        hoRaS['json']({
            'message': hORAS(0x16a),
            'user': {
                'id': rAYmAru['id'],
                'name': rAYmAru['name'],
                'npm': rAYmAru[hORAS(0x150)],
                'email': rAYmAru[hORAS(0x18e)],
                'phone': rAYmAru['phone'],
                'role': rAYmAru[hORAS(0x13f)]
            }
        });
    } catch (rayMAru) {
        console[hORAS(0x160)](hORAS(0x140), rayMAru);
        hoRaS[hORAS(0x146)](0x1f4)[hORAS(0x18f)]({ 'message': hORAS(0x16e) });
        console[hORAS(0x17a)](hORAS(0x14a), {
            'email': email,
            'id': user['id']
        });
    }
};
