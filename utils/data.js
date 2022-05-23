import bcrypt from 'bcryptjs';

const data = {
    customers: [
        {
            name: 'پریسا شهابی نژاد',
            city: 3,
            balance: 120000,
            phoneNumber: '09367205062',
            password: bcrypt.hashSync('123456'),
        },
        {
            name: 'seller',
            city: 10,
            balance: 100000000,
            phoneNumber: '09999999999',
            password: bcrypt.hashSync('123456'),
        },
    ],
    supermarkets: [
        {
            name: "سوپر مارکت ستاره",
            city: 10,
            address: "اصفهان، شیخ مفید، نبش فرعی لاله",
            phoneNumber: "09132402742",
            nationalId: "2981196520",
            password: bcrypt.hashSync('123456'),
            ranking: 4.2,
            status: "CONFIRMED"
        },
        {
            name: "فروشگاه سر کوچه",
            city: 10,
            address: "اصفهان، باغ زیار، ته کوچه ۱۴",
            phoneNumber: "09133426982",
            nationalId: "2981196529",
            password: bcrypt.hashSync('123456'),
            ranking: 3.8,
            status: "PENDING"
        },
    ],
    products:[
        {
            name: "تن ماهی طبیعت",
            category: {
                name: "کنسرو",
                id: 1,
            },
            description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است ",
            slug: "0",
            image: "https://statics.basalam.com/public/users/AgPpB/2106/e6uTwceQpMXSognejk21fuan5ikIxXYWJHRTyXHO.jpeg_512X512X70.jpeg",
        },
        {
            name: "تن ماهی گوهرانه",
            category: {
                name: "کنسرو",
                id: 1,
            },
            slug: "1",
            description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است ",
            image: "https://statics.basalam.com/public/users/AgPpB/2106/e6uTwceQpMXSognejk21fuan5ikIxXYWJHRTyXHO.jpeg_512X512X70.jpeg",
        }, {
            name: "روغن سرخ کردنی لادن طلایی",
            category: {
                name: "کنسرو",
                id: 1,
            },
            slug: "2",
            description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است ",
            image: "https://arzaansara.ir/wp-content/uploads/2020/05/WhatsApp-Image-2020-05-01-at-5.24.31-AM-1.jpeg",
        }, {
            name: "صابون گلنار",
            category: {
                name: "کنسرو",
                id: 1,
            },
            slug: "3",
            description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است ",
            image: "https://statics.basalam.com/public/users/njXxp/2107/opJVSQkeJfXCtsPx5yqcBEOc34VyjiiW5UEr6w31.jpeg_512X512X70.jpeg",
        },{
            name: "بیسکوییت مادر",
            category: {
                name: "کنسرو",
                id: 1,
            },
            slug: "4",
            description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است ",
            image: "data:image/jpeg;base64,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",
        },{
            name: "نوشابه اسپرایت",
            category: {
                name: "کنسرو",
                id: 1,
            },
            slug: "5",
            description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است ",
            image: "https://bazarche2.ir/Opitures/323391483354413.jpg",
        },
    ],
    stocks: [
        {
            supermarketId: '6287371b943525d22fd07c51',
            productId: '6287371b943525d22fd07c55',
            productionDate: Date.now(),
            expiryDate: Date.now(),
            price: 120000,
            oldPrice: 150000,
            countInStock: 10,
        },
        {
            supermarketId: '6287371b943525d22fd07c51',
            productId: '6287371b943525d22fd07c57',
            productionDate: Date.now(),
            expiryDate: Date.now(),
            price: 1000,
            oldPrice: 17000,
            countInStock: 13,
        },
        {
            supermarketId: '6287371b943525d22fd07c52',
            productId: '6287371b943525d22fd07c57',
            productionDate: Date.now(),
            expiryDate: Date.now(),
            price: 111000,
            oldPrice: 117000,
            countInStock: 2,
        },
    ]
}
export default data;