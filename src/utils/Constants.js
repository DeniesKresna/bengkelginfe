export const PAGINATION_LIMIT = 15

// cari course
export const PAGINATION_LIMIT_COURSE_SEARCH = 9

// payment status
export const STATUS_BELUM_BAYAR = "Belum dibayar"
export const STATUS_BELUM_LUNAS = "Belum lunas"
export const STATUS_LUNAS = "Lunas"

// service status
export const STATUS_BELUM_BERJALAN = "Belum dimulai"
export const STATUS_BERJALAN = "Sedang berjalan"
export const STATUS_SELESAI = "Selesai"

// transaction form support
export const hours = [
    { text: '00' }, { text: '01' }, { text: '02' }, { text: '03' }, { text: '04' }, { text: '05' }, { text: '06' }, { text: '07' }, { text: '08' },
    { text: '09' }, { text: '10' }, { text: '11' }, { text: '12' }, { text: '13' }, { text: '14' }, { text: '15' }, { text: '16' }, { text: '17' },
    { text: '18' }, { text: '19' }, { text: '20' }, { text: '21' }, { text: '22' }, { text: '23' }, { text: '24' },
]

export const minutes = [
    { text: '00' }, { text: '01' }, { text: '02' }, { text: '03' }, { text: '04' }, { text: '05' }, { text: '06' }, { text: '07' }, { text: '08' },
    { text: '09' }, { text: '10' }, { text: '11' }, { text: '12' }, { text: '13' }, { text: '14' }, { text: '15' }, { text: '16' }, { text: '17' },
    { text: '18' }, { text: '19' }, { text: '20' }, { text: '21' }, { text: '22' }, { text: '23' }, { text: '24' },
    { text: '25' }, { text: '26' }, { text: '27' }, { text: '28' }, { text: '29' }, { text: '30' }, { text: '31' }, { text: '32' }, { text: '33' },
    { text: '34' }, { text: '35' }, { text: '36' }, { text: '37' }, { text: '38' }, { text: '39' }, { text: '40' }, { text: '41' }, { text: '42' },
    { text: '43' }, { text: '44' }, { text: '45' }, { text: '46' }, { text: '47' }, { text: '48' }, { text: '49' },
    { text: '50' }, { text: '51' }, { text: '52' }, { text: '53' }, { text: '54' }, { text: '55' }, { text: '56' }, { text: '57' }, { text: '58' },
    { text: '59' }
]

// hari
export const days = [
    'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'
]

// jenis materi
export const discussions = [
    'Teori', 'Praktik', 'Tools', 'Soft Skill'
]

// jenis pekerjaan yang bisa diterima
export const type = [
    'Freelance', 'Part Time', 'Full Time'
]

export const star = [
    {
        value: 1
    },
    {
        value: 2
    },
    {
        value: 3
    },
    {
        value: 4
    },
    {
        value: 5
    }
]

export const payments = [
    {
        text: STATUS_LUNAS
    },
    {
        text: STATUS_BELUM_LUNAS
    },
    {
        text: STATUS_BELUM_BAYAR
    }
]

export const status = [
    {
        text: STATUS_BELUM_BERJALAN
    },
    {
        text: STATUS_BERJALAN
    },
    {
        text: STATUS_SELESAI
    }
]

export const services = [
    {
        value: "consultation",
        label: "Konsultasi"
    },
    {
        value: "training",
        label: "Pelatihan"
    },
    {
        value: "invitation",
        label: "Undang Expert"
    },
    {
        value: "recruitment",
        label: "Rekrut Expert"
    }
]

export const course_program = [
    {
        value: "JA",
        label: "Jobhun Academy"
    },
    {
        value: "JC",
        label: "Jobhun Class"
    },
    {
        value: "SIB",
        label: "Studi Independen Bersertifikat"
    },
    {
        value: "ACP",
        label: "Airlangga Career Preparation"
    },
    {
        value: "YES",
        label: "YES Tech"
    },
    {
        value: "RTW",
        label: "Ready to Work"
    },
    {
        value: "JAC",
        label: "Jobhun Academy for Corporate"
    },
    {
        value: "KP",
        label: "Kartu Prakerja"
    }
]

export const course_type = [
    {
        value: "OF",
        label: "Offline"
    },
    {
        value: "OL",
        label: "Online"
    },
    {
        value: "HY",
        label: "Hybrid"
    },
    {
        value: "RC",
        label: "Recording"
    }
]

export const bidang = [
    "Blogging",
    "Banking",
    "Branding",
    "Business Development",
    "Career Development",
    "Civil Servant",
    "Community Specialist",
    "Consultant",
    "Content Creator",
    "Content Writing",
    "Copywriting",
    "Creative",
    "Customer Relations",
    "Data Analyst",
    "Data Engineering",
    "Digital Strategist",
    "Engineering",
    "Backend Development",
    "Frontend Development",
    "Full Stack Development",
    "Business-SMES",
    "Startup Development",
    "Graphic Design",
    "Growth Hacking",
    "Health Sector",
    "Human Capital",
    "Human Resource",
    "Ilustration",
    "Interpreting",
    "Investment",
    "KOL",
    "Marketing",
    "Marketing Communication",
    "Motion Graphic",
    "News Presenter",
    "Partnership",
    "People Management",
    "Product Development",
    "Product Management",
    "Programming",
    "Public Relation",
    "Public Speaking",
    "Research",
    "Sales",
    "SEO",
    "Social Initiator",
    "Social Media Management",
    "Software Engineering",
    "Talent Acquisition",
    "Training",
    "Translating",
    "TV Presenter",
    "UI/UX Design",
    "UX Writing",
    "Videography",
    "Voice over",
    "Writing",
    "Teaching",
    "Tourism",
    "Law"
]

export const ROLE_ADMIN = "administrator"
export const ROLE_USER = "user"
export const ROLE_EMPLOYEE = "employee"