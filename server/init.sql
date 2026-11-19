-- Таблица автомобилей Boxcars
CREATE TABLE IF NOT EXISTS cars (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    image_key VARCHAR(255),
    badge JSONB,
    badges JSONB,
    has_video BOOLEAN DEFAULT false,
    price NUMERIC NOT NULL,
    formatted_price VARCHAR(50),
    old_price NUMERIC,
    formatted_old_price VARCHAR(50),
    instant_saving VARCHAR(50),
    quick_specs JSONB NOT NULL,
    overview JSONB NOT NULL,
    dealer JSONB NOT NULL,
    description JSONB NOT NULL,
    features JSONB NOT NULL,
    dimensions JSONB NOT NULL,
    engine_and_transmission JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Индексы для быстрой фильтрации и поиска
CREATE INDEX IF NOT EXISTS idx_cars_slug ON cars(slug);
CREATE INDEX IF NOT EXISTS idx_cars_price ON cars(price);
CREATE INDEX IF NOT EXISTS idx_cars_body ON cars USING GIN ((overview->'body'));
CREATE INDEX IF NOT EXISTS idx_cars_fuel ON cars USING GIN ((overview->'fuelType'));

-- Очистка перед заполнением
TRUNCATE TABLE cars RESTART IDENTITY;

-- Заливка всех 12 автомобилей
INSERT INTO cars (
    id, slug, name, subtitle, image_key, badge, badges, has_video,
    price, formatted_price, old_price, formatted_old_price, instant_saving,
    quick_specs, overview, dealer, description, features, dimensions, engine_and_transmission
) VALUES (
    1,
    'toyota-camry-new',
    'Toyota Camry New',
    '3.5 D5 PowerPulse Momentum 5dr AW… Geartronic Estate',
    'p2_car8_660x440',
    '{"text":"Great Price","type":"green"}',
    '["Great Price"]',
    true,
    40000,
    '$40,000',
    NULL,
    NULL,
    NULL,
    '{"miles":"20 Miles","fuel":"Petrol","transmission":"Automatic"}',
    '{"body":"Sedan","mileage":"20 miles","fuelType":"Petrol","year":2023,"transmission":"Automatic","driveType":"Front-Wheel Drive","condition":"New","engineSize":"3.5L","doors":4,"cylinders":6,"color":"Silver","vin":"TCM948201"}',
    '{"name":"admin","avatar":"p1_s7_team5_150x150","address":"943 Broadway, Brooklyn","phone":"+88-123456789","whatsapp":"+88123456789"}',
    '{"paragraphs":["Quisque imperdiet dignissim enim dictum finibus. Sed consectetutr convallis enim eget laoreet. Aenean vitae nisl mollis, porta risus vel, dapibus lectus. Etiam ac suscipit eros, eget maximus","Etiam sit amet ex pharetra, venenatis ante vehicula, gravida sapien. Fusce eleifend vulputate nibh, non cursus augue placerat pellentesque. Sed venenatis risus nec felis mollis, in pharetra urna euismod. Morbi aliquam ut turpis sit amet ultrices. Vestibulum mattis blandit nisl, et tristique elit scelerisque nec. Fusce eleifend laoreet dui eget aliquet. Ut rutrum risus et nunc pretium scelerisque."],"brochure":"Car-Brochure.Pdf"}',
    '{"interior":["Air Conditioner","Digital Odometer","Heater","Leather Seats","Panoramic Moonroof","Tachometer"],"safety":["Anti-lock Braking","Brake Assist","Child Safety Locks","Driver Air Bag","Power Door Locks"],"exterior":["Fog Lights Front","Rain Sensing Wiper","Rear Spoiler","Windows - Electric"],"comfort":["Android Auto","Apple CarPlay","Bluetooth","HomeLink","Power Steering"]}',
    '{"length":"4885mm","width":"1840mm","height":"1445mm","widthWithMirrors":"2070mm","wheelbase":"2825mm","grossVehicleWeight":"1600 kg","heightWithRoofRails":"1455mm","maxLoadingWeight":"520 kg","luggageCapacityUp":"428 Litres","maxRoofLoad":"75 kg","luggageCapacityDown":"850 Litres","seats":5}',
    '{"fuelTankCapacity":"60 Litres","minKerbweight":"1530 kg","maxTowingWeightBraked":"1600 kg","turningCircle":"5500 m","maxTowingWeightUnbraked":"750 kg"}'
);

INSERT INTO cars (
    id, slug, name, subtitle, image_key, badge, badges, has_video,
    price, formatted_price, old_price, formatted_old_price, instant_saving,
    quick_specs, overview, dealer, description, features, dimensions, engine_and_transmission
) VALUES (
    2,
    'c-class-2023',
    'C-Class – 2023',
    '4.0 D5 PowerPulse Momentum 5dr AW… Geartronic Estate',
    'p2_car14_660x440',
    NULL,
    '[]',
    true,
    150000,
    '$150,000',
    NULL,
    NULL,
    NULL,
    '{"miles":"50 Miles","fuel":"Petrol","transmission":"Automatic"}',
    '{"body":"Sedan","mileage":"50 miles","fuelType":"Petrol","year":2023,"transmission":"Automatic","driveType":"All-Wheel Drive","condition":"New","engineSize":"4.0L","doors":4,"cylinders":8,"color":"Blue","vin":"MBZ782910"}',
    '{"name":"admin","avatar":"p1_s7_team5_150x150","address":"943 Broadway, Brooklyn","phone":"+88-123456789","whatsapp":"+88123456789"}',
    '{"paragraphs":["Quisque imperdiet dignissim enim dictum finibus. Sed consectetutr convallis enim eget laoreet. Aenean vitae nisl mollis, porta risus vel, dapibus lectus. Etiam ac suscipit eros, eget maximus","Etiam sit amet ex pharetra, venenatis ante vehicula, gravida sapien. Fusce eleifend vulputate nibh, non cursus augue placerat pellentesque. Sed venenatis risus nec felis mollis, in pharetra urna euismod. Morbi aliquam ut turpis sit amet ultrices. Vestibulum mattis blandit nisl, et tristique elit scelerisque nec. Fusce eleifend laoreet dui eget aliquet. Ut rutrum risus et nunc pretium scelerisque."],"brochure":"Car-Brochure.Pdf"}',
    '{"interior":["Air Conditioner","Digital Odometer","Heater","Leather Seats","Panoramic Moonroof","Tachometer"],"safety":["Anti-lock Braking","Brake Assist","Child Safety Locks","Driver Air Bag","Power Door Locks"],"exterior":["Fog Lights Front","Rain Sensing Wiper","Rear Spoiler","Windows - Electric"],"comfort":["Android Auto","Apple CarPlay","Bluetooth","HomeLink","Power Steering"]}',
    '{"length":"4751mm","width":"1820mm","height":"1438mm","widthWithMirrors":"2033mm","wheelbase":"2865mm","grossVehicleWeight":"1750 kg","heightWithRoofRails":"1448mm","maxLoadingWeight":"580 kg","luggageCapacityUp":"455 Litres","maxRoofLoad":"100 kg","luggageCapacityDown":"920 Litres","seats":5}',
    '{"fuelTankCapacity":"66 Litres","minKerbweight":"1680 kg","maxTowingWeightBraked":"1800 kg","turningCircle":"5600 m","maxTowingWeightUnbraked":"750 kg"}'
);

INSERT INTO cars (
    id, slug, name, subtitle, image_key, badge, badges, has_video,
    price, formatted_price, old_price, formatted_old_price, instant_saving,
    quick_specs, overview, dealer, description, features, dimensions, engine_and_transmission
) VALUES (
    3,
    'ford-transit-2021',
    'Ford Transit – 2021',
    '4.0 D5 PowerPulse Momentum 5dr AW… Geartronic Estate',
    'p2_car13_660x440',
    '{"text":"Great Price","type":"green"}',
    '["Great Price"]',
    true,
    22000,
    '$22,000',
    NULL,
    NULL,
    NULL,
    '{"miles":"2500 Miles","fuel":"Diesel","transmission":"Manual"}',
    '{"body":"Truck","mileage":"2500 miles","fuelType":"Diesel","year":2021,"transmission":"Manual","driveType":"Rear-Wheel Drive","condition":"Used","engineSize":"2.0L","doors":4,"cylinders":4,"color":"Gold","vin":"FT7392014"}',
    '{"name":"admin","avatar":"p1_s7_team5_150x150","address":"943 Broadway, Brooklyn","phone":"+88-123456789","whatsapp":"+88123456789"}',
    '{"paragraphs":["Quisque imperdiet dignissim enim dictum finibus. Sed consectetutr convallis enim eget laoreet. Aenean vitae nisl mollis, porta risus vel, dapibus lectus. Etiam ac suscipit eros, eget maximus","Etiam sit amet ex pharetra, venenatis ante vehicula, gravida sapien. Fusce eleifend vulputate nibh, non cursus augue placerat pellentesque. Sed venenatis risus nec felis mollis, in pharetra urna euismod. Morbi aliquam ut turpis sit amet ultrices. Vestibulum mattis blandit nisl, et tristique elit scelerisque nec. Fusce eleifend laoreet dui eget aliquet. Ut rutrum risus et nunc pretium scelerisque."],"brochure":"Car-Brochure.Pdf"}',
    '{"interior":["Air Conditioner","Digital Odometer","Heater","Leather Seats","Panoramic Moonroof","Tachometer"],"safety":["Anti-lock Braking","Brake Assist","Child Safety Locks","Driver Air Bag","Power Door Locks"],"exterior":["Fog Lights Front","Rain Sensing Wiper","Rear Spoiler","Windows - Electric"],"comfort":["Android Auto","Apple CarPlay","Bluetooth","HomeLink","Power Steering"]}',
    '{"length":"5531mm","width":"2059mm","height":"2550mm","widthWithMirrors":"2474mm","wheelbase":"3300mm","grossVehicleWeight":"3500 kg","heightWithRoofRails":"2560mm","maxLoadingWeight":"1400 kg","luggageCapacityUp":"1150 Litres","maxRoofLoad":"150 kg","luggageCapacityDown":"3000 Litres","seats":3}',
    '{"fuelTankCapacity":"80 Litres","minKerbweight":"2100 kg","maxTowingWeightBraked":"2800 kg","turningCircle":"6200 m","maxTowingWeightUnbraked":"750 kg"}'
);

INSERT INTO cars (
    id, slug, name, subtitle, image_key, badge, badges, has_video,
    price, formatted_price, old_price, formatted_old_price, instant_saving,
    quick_specs, overview, dealer, description, features, dimensions, engine_and_transmission
) VALUES (
    4,
    'new-glc-2023',
    'New GLC – 2023',
    '4.0 D5 PowerPulse Momentum 5dr AW… Geartronic Estate',
    'p2_car19_660x440',
    '{"text":"Low Mileage","type":"blue"}',
    '["Low Mileage"]',
    true,
    95000,
    '$95,000',
    NULL,
    NULL,
    NULL,
    '{"miles":"50 Miles","fuel":"Petrol","transmission":"Automatic"}',
    '{"body":"SUV","mileage":"50 miles","fuelType":"Petrol","year":2023,"transmission":"Automatic","driveType":"All-Wheel Drive","condition":"New","engineSize":"4.0L","doors":5,"cylinders":8,"color":"Deep Blue","vin":"GLC938102"}',
    '{"name":"admin","avatar":"p1_s7_team5_150x150","address":"943 Broadway, Brooklyn","phone":"+88-123456789","whatsapp":"+88123456789"}',
    '{"paragraphs":["Quisque imperdiet dignissim enim dictum finibus. Sed consectetutr convallis enim eget laoreet. Aenean vitae nisl mollis, porta risus vel, dapibus lectus. Etiam ac suscipit eros, eget maximus","Etiam sit amet ex pharetra, venenatis ante vehicula, gravida sapien. Fusce eleifend vulputate nibh, non cursus augue placerat pellentesque. Sed venenatis risus nec felis mollis, in pharetra urna euismod. Morbi aliquam ut turpis sit amet ultrices. Vestibulum mattis blandit nisl, et tristique elit scelerisque nec. Fusce eleifend laoreet dui eget aliquet. Ut rutrum risus et nunc pretium scelerisque."],"brochure":"Car-Brochure.Pdf"}',
    '{"interior":["Air Conditioner","Digital Odometer","Heater","Leather Seats","Panoramic Moonroof","Tachometer"],"safety":["Anti-lock Braking","Brake Assist","Child Safety Locks","Driver Air Bag","Power Door Locks"],"exterior":["Fog Lights Front","Rain Sensing Wiper","Rear Spoiler","Windows - Electric"],"comfort":["Android Auto","Apple CarPlay","Bluetooth","HomeLink","Power Steering"]}',
    '{"length":"4716mm","width":"1890mm","height":"1640mm","widthWithMirrors":"2076mm","wheelbase":"2888mm","grossVehicleWeight":"2400 kg","heightWithRoofRails":"1650mm","maxLoadingWeight":"650 kg","luggageCapacityUp":"620 Litres","maxRoofLoad":"100 kg","luggageCapacityDown":"1680 Litres","seats":5}',
    '{"fuelTankCapacity":"62 Litres","minKerbweight":"1875 kg","maxTowingWeightBraked":"2500 kg","turningCircle":"5900 m","maxTowingWeightUnbraked":"750 kg"}'
);

INSERT INTO cars (
    id, slug, name, subtitle, image_key, badge, badges, has_video,
    price, formatted_price, old_price, formatted_old_price, instant_saving,
    quick_specs, overview, dealer, description, features, dimensions, engine_and_transmission
) VALUES (
    5,
    'audi-a6-35-new',
    'Audi A6 3.5 – New',
    '3.5 D5 PowerPulse Momentum 5dr AW… Geartronic Estate',
    'p2_car12_660x440',
    NULL,
    '[]',
    true,
    58000,
    '$58,000',
    NULL,
    NULL,
    NULL,
    '{"miles":"100 Miles","fuel":"Petrol","transmission":"Automatic"}',
    '{"body":"Sedan","mileage":"100 miles","fuelType":"Petrol","year":2023,"transmission":"Automatic","driveType":"All-Wheel Drive","condition":"New","engineSize":"3.5L","doors":4,"cylinders":6,"color":"Bronze","vin":"AU6928103"}',
    '{"name":"admin","avatar":"p1_s7_team5_150x150","address":"943 Broadway, Brooklyn","phone":"+88-123456789","whatsapp":"+88123456789"}',
    '{"paragraphs":["Quisque imperdiet dignissim enim dictum finibus. Sed consectetutr convallis enim eget laoreet. Aenean vitae nisl mollis, porta risus vel, dapibus lectus. Etiam ac suscipit eros, eget maximus","Etiam sit amet ex pharetra, venenatis ante vehicula, gravida sapien. Fusce eleifend vulputate nibh, non cursus augue placerat pellentesque. Sed venenatis risus nec felis mollis, in pharetra urna euismod. Morbi aliquam ut turpis sit amet ultrices. Vestibulum mattis blandit nisl, et tristique elit scelerisque nec. Fusce eleifend laoreet dui eget aliquet. Ut rutrum risus et nunc pretium scelerisque."],"brochure":"Car-Brochure.Pdf"}',
    '{"interior":["Air Conditioner","Digital Odometer","Heater","Leather Seats","Panoramic Moonroof","Tachometer"],"safety":["Anti-lock Braking","Brake Assist","Child Safety Locks","Driver Air Bag","Power Door Locks"],"exterior":["Fog Lights Front","Rain Sensing Wiper","Rear Spoiler","Windows - Electric"],"comfort":["Android Auto","Apple CarPlay","Bluetooth","HomeLink","Power Steering"]}',
    '{"length":"4939mm","width":"1886mm","height":"1457mm","widthWithMirrors":"2110mm","wheelbase":"2924mm","grossVehicleWeight":"2255 kg","heightWithRoofRails":"1467mm","maxLoadingWeight":"575 kg","luggageCapacityUp":"530 Litres","maxRoofLoad":"90 kg","luggageCapacityDown":"990 Litres","seats":5}',
    '{"fuelTankCapacity":"73 Litres","minKerbweight":"1720 kg","maxTowingWeightBraked":"2000 kg","turningCircle":"5800 m","maxTowingWeightUnbraked":"750 kg"}'
);

INSERT INTO cars (
    id, slug, name, subtitle, image_key, badge, badges, has_video,
    price, formatted_price, old_price, formatted_old_price, instant_saving,
    quick_specs, overview, dealer, description, features, dimensions, engine_and_transmission
) VALUES (
    6,
    'audi-a4-45-new',
    'Audi A4, 4.5 New',
    '3.5 D5 PowerPulse Momentum 5dr AW… Geartronic Estate',
    'p2_car17_660x440',
    NULL,
    '[]',
    true,
    250000,
    '$250,000',
    NULL,
    NULL,
    NULL,
    '{"miles":"60 Miles","fuel":"Petrol","transmission":"Automatic"}',
    '{"body":"SUV","mileage":"60 miles","fuelType":"Petrol","year":2023,"transmission":"Automatic","driveType":"All-Wheel Drive","condition":"New","engineSize":"4.5L","doors":5,"cylinders":8,"color":"Teal Metallic","vin":"AU4829104"}',
    '{"name":"admin","avatar":"p1_s7_team5_150x150","address":"943 Broadway, Brooklyn","phone":"+88-123456789","whatsapp":"+88123456789"}',
    '{"paragraphs":["Quisque imperdiet dignissim enim dictum finibus. Sed consectetutr convallis enim eget laoreet. Aenean vitae nisl mollis, porta risus vel, dapibus lectus. Etiam ac suscipit eros, eget maximus","Etiam sit amet ex pharetra, venenatis ante vehicula, gravida sapien. Fusce eleifend vulputate nibh, non cursus augue placerat pellentesque. Sed venenatis risus nec felis mollis, in pharetra urna euismod. Morbi aliquam ut turpis sit amet ultrices. Vestibulum mattis blandit nisl, et tristique elit scelerisque nec. Fusce eleifend laoreet dui eget aliquet. Ut rutrum risus et nunc pretium scelerisque."],"brochure":"Car-Brochure.Pdf"}',
    '{"interior":["Air Conditioner","Digital Odometer","Heater","Leather Seats","Panoramic Moonroof","Tachometer"],"safety":["Anti-lock Braking","Brake Assist","Child Safety Locks","Driver Air Bag","Power Door Locks"],"exterior":["Fog Lights Front","Rain Sensing Wiper","Rear Spoiler","Windows - Electric"],"comfort":["Android Auto","Apple CarPlay","Bluetooth","HomeLink","Power Steering"]}',
    '{"length":"5000mm","width":"2000mm","height":"1860mm","widthWithMirrors":"2220mm","wheelbase":"2990mm","grossVehicleWeight":"2800 kg","heightWithRoofRails":"1870mm","maxLoadingWeight":"700 kg","luggageCapacityUp":"800 Litres","maxRoofLoad":"150 kg","luggageCapacityDown":"1900 Litres","seats":5}',
    '{"fuelTankCapacity":"90 Litres","minKerbweight":"2200 kg","maxTowingWeightBraked":"3500 kg","turningCircle":"6100 m","maxTowingWeightUnbraked":"750 kg"}'
);

INSERT INTO cars (
    id, slug, name, subtitle, image_key, badge, badges, has_video,
    price, formatted_price, old_price, formatted_old_price, instant_saving,
    quick_specs, overview, dealer, description, features, dimensions, engine_and_transmission
) VALUES (
    7,
    'ranger-black-2021',
    'Ranger Black – 2021',
    '2.0 D5 PowerPulse Momentum 5dr AW… Geartronic Estate',
    'p2_car11_660x440',
    '{"text":"Sale","type":"blue"}',
    '["Sale"]',
    true,
    165000,
    '$165,000',
    180000,
    '$180,000',
    NULL,
    '{"miles":"250 Miles","fuel":"Petrol","transmission":"Manual"}',
    '{"body":"Sedan","mileage":"250","fuelType":"Petrol","year":2021,"transmission":"Manual","driveType":"Rear-Wheel Drive","condition":"Used","engineSize":"4.0","doors":4,"cylinders":12,"color":"Black","vin":"FCB123792"}',
    '{"name":"admin","avatar":"p1_s7_team5_150x150","address":"943 Broadway, Brooklyn","phone":"+88-123456789","whatsapp":"+88123456789"}',
    '{"paragraphs":["Quisque imperdiet dignissim enim dictum finibus. Sed consectetutr convallis enim eget laoreet. Aenean vitae nisl mollis, porta risus vel, dapibus lectus. Etiam ac suscipit eros, eget maximus","Etiam sit amet ex pharetra, venenatis ante vehicula, gravida sapien. Fusce eleifend vulputate nibh, non cursus augue placerat pellentesque. Sed venenatis risus nec felis mollis, in pharetra urna euismod. Morbi aliquam ut turpis sit amet ultrices. Vestibulum mattis blandit nisl, et tristique elit scelerisque nec. Fusce eleifend laoreet dui eget aliquet. Ut rutrum risus et nunc pretium scelerisque."],"brochure":"Car-Brochure.Pdf"}',
    '{"interior":["Air Conditioner","Digital Odometer","Heater","Leather Seats","Panoramic Moonroof","Tachometer"],"safety":["Anti-lock Braking","Brake Assist","Child Safety Locks","Driver Air Bag","Power Door Locks"],"exterior":["Fog Lights Front","Rain Sensing Wiper","Rear Spoiler","Windows - Electric"],"comfort":["Android Auto","Apple CarPlay","Bluetooth","HomeLink","Power Steering"]}',
    '{"length":"4950mm","width":"2140mm","height":"1776mm","widthWithMirrors":"2240mm","wheelbase":"2984mm","grossVehicleWeight":"1550 kg","heightWithRoofRails":"1876mm","maxLoadingWeight":"1200 kg","luggageCapacityUp":"450 Litres","maxRoofLoad":"350 kg","luggageCapacityDown":"850 Litres","seats":5}',
    '{"fuelTankCapacity":"100 Litres","minKerbweight":"350 kg","maxTowingWeightBraked":"800 kg","turningCircle":"4500 m","maxTowingWeightUnbraked":"1000 kg"}'
);

INSERT INTO cars (
    id, slug, name, subtitle, image_key, badge, badges, has_video,
    price, formatted_price, old_price, formatted_old_price, instant_saving,
    quick_specs, overview, dealer, description, features, dimensions, engine_and_transmission
) VALUES (
    8,
    'mercedes-benz-c-class',
    'Mercedes-Benz, C Class',
    '2.0 D5 PowerPulse Momentum 5dr AW… Geartronic Estate',
    'p2_car6_660x440',
    '{"text":"Great Price","type":"green"}',
    '["Great Price"]',
    true,
    35000,
    '$35,000',
    40000,
    '$40,000',
    NULL,
    '{"miles":"100 Miles","fuel":"Petrol","transmission":"Automatic"}',
    '{"body":"SUV","mileage":"100 miles","fuelType":"Petrol","year":2021,"transmission":"Automatic","driveType":"All-Wheel Drive","condition":"Used","engineSize":"2.0L","doors":5,"cylinders":4,"color":"Grey Metallic","vin":"MBC819203"}',
    '{"name":"admin","avatar":"p1_s7_team5_150x150","address":"943 Broadway, Brooklyn","phone":"+88-123456789","whatsapp":"+88123456789"}',
    '{"paragraphs":["Quisque imperdiet dignissim enim dictum finibus. Sed consectetutr convallis enim eget laoreet. Aenean vitae nisl mollis, porta risus vel, dapibus lectus. Etiam ac suscipit eros, eget maximus","Etiam sit amet ex pharetra, venenatis ante vehicula, gravida sapien. Fusce eleifend vulputate nibh, non cursus augue placerat pellentesque. Sed venenatis risus nec felis mollis, in pharetra urna euismod. Morbi aliquam ut turpis sit amet ultrices. Vestibulum mattis blandit nisl, et tristique elit scelerisque nec. Fusce eleifend laoreet dui eget aliquet. Ut rutrum risus et nunc pretium scelerisque."],"brochure":"Car-Brochure.Pdf"}',
    '{"interior":["Air Conditioner","Digital Odometer","Heater","Leather Seats","Panoramic Moonroof","Tachometer"],"safety":["Anti-lock Braking","Brake Assist","Child Safety Locks","Driver Air Bag","Power Door Locks"],"exterior":["Fog Lights Front","Rain Sensing Wiper","Rear Spoiler","Windows - Electric"],"comfort":["Android Auto","Apple CarPlay","Bluetooth","HomeLink","Power Steering"]}',
    '{"length":"4950mm","width":"2140mm","height":"1776mm","widthWithMirrors":"2240mm","wheelbase":"2984mm","grossVehicleWeight":"2300 kg","heightWithRoofRails":"1876mm","maxLoadingWeight":"650 kg","luggageCapacityUp":"650 Litres","maxRoofLoad":"100 kg","luggageCapacityDown":"1800 Litres","seats":5}',
    '{"fuelTankCapacity":"70 Litres","minKerbweight":"1850 kg","maxTowingWeightBraked":"2400 kg","turningCircle":"5800 m","maxTowingWeightUnbraked":"750 kg"}'
);

INSERT INTO cars (
    id, slug, name, subtitle, image_key, badge, badges, has_video,
    price, formatted_price, old_price, formatted_old_price, instant_saving,
    quick_specs, overview, dealer, description, features, dimensions, engine_and_transmission
) VALUES (
    9,
    'ranger-white-2022',
    'Ranger White – 2022',
    '2.0 D5 PowerPulse Momentum 5dr AW… Geartronic Estate',
    'p2_car3_660x440',
    '{"text":"Low Mileage","type":"blue"}',
    '["Low Mileage"]',
    true,
    25000,
    '$25,000',
    NULL,
    NULL,
    NULL,
    '{"miles":"30000 Miles","fuel":"Diesel","transmission":"Manual"}',
    '{"body":"Convertible","mileage":"30000 miles","fuelType":"Diesel","year":2022,"transmission":"Manual","driveType":"Rear-Wheel Drive","condition":"Used","engineSize":"2.0L","doors":2,"cylinders":4,"color":"White","vin":"RW2910384"}',
    '{"name":"admin","avatar":"p1_s7_team5_150x150","address":"943 Broadway, Brooklyn","phone":"+88-123456789","whatsapp":"+88123456789"}',
    '{"paragraphs":["Quisque imperdiet dignissim enim dictum finibus. Sed consectetutr convallis enim eget laoreet. Aenean vitae nisl mollis, porta risus vel, dapibus lectus. Etiam ac suscipit eros, eget maximus","Etiam sit amet ex pharetra, venenatis ante vehicula, gravida sapien. Fusce eleifend vulputate nibh, non cursus augue placerat pellentesque. Sed venenatis risus nec felis mollis, in pharetra urna euismod. Morbi aliquam ut turpis sit amet ultrices. Vestibulum mattis blandit nisl, et tristique elit scelerisque nec. Fusce eleifend laoreet dui eget aliquet. Ut rutrum risus et nunc pretium scelerisque."],"brochure":"Car-Brochure.Pdf"}',
    '{"interior":["Air Conditioner","Digital Odometer","Heater","Leather Seats","Panoramic Moonroof","Tachometer"],"safety":["Anti-lock Braking","Brake Assist","Child Safety Locks","Driver Air Bag","Power Door Locks"],"exterior":["Fog Lights Front","Rain Sensing Wiper","Rear Spoiler","Windows - Electric"],"comfort":["Android Auto","Apple CarPlay","Bluetooth","HomeLink","Power Steering"]}',
    '{"length":"4700mm","width":"1850mm","height":"1380mm","widthWithMirrors":"2020mm","wheelbase":"2820mm","grossVehicleWeight":"1900 kg","heightWithRoofRails":"1390mm","maxLoadingWeight":"450 kg","luggageCapacityUp":"380 Litres","maxRoofLoad":"50 kg","luggageCapacityDown":"700 Litres","seats":4}',
    '{"fuelTankCapacity":"58 Litres","minKerbweight":"1590 kg","maxTowingWeightBraked":"1600 kg","turningCircle":"5400 m","maxTowingWeightUnbraked":"750 kg"}'
);

INSERT INTO cars (
    id, slug, name, subtitle, image_key, badge, badges, has_video,
    price, formatted_price, old_price, formatted_old_price, instant_saving,
    quick_specs, overview, dealer, description, features, dimensions, engine_and_transmission
) VALUES (
    10,
    't-cross-2023',
    'T-Cross – 2023',
    '4.0 D5 PowerPulse Momentum 5dr AW… Geartronic Estate',
    'p2_car9_660x440',
    NULL,
    '[]',
    true,
    15000,
    '$15,000',
    NULL,
    NULL,
    NULL,
    '{"miles":"15 Miles","fuel":"Petrol","transmission":"CVT"}',
    '{"body":"SUV","mileage":"15 miles","fuelType":"Petrol","year":2023,"transmission":"CVT","driveType":"All-Wheel Drive","condition":"New","engineSize":"4.0L","doors":5,"cylinders":6,"color":"Silver White","vin":"TC3910284"}',
    '{"name":"admin","avatar":"p1_s7_team5_150x150","address":"943 Broadway, Brooklyn","phone":"+88-123456789","whatsapp":"+88123456789"}',
    '{"paragraphs":["Quisque imperdiet dignissim enim dictum finibus. Sed consectetutr convallis enim eget laoreet. Aenean vitae nisl mollis, porta risus vel, dapibus lectus. Etiam ac suscipit eros, eget maximus","Etiam sit amet ex pharetra, venenatis ante vehicula, gravida sapien. Fusce eleifend vulputate nibh, non cursus augue placerat pellentesque. Sed venenatis risus nec felis mollis, in pharetra urna euismod. Morbi aliquam ut turpis sit amet ultrices. Vestibulum mattis blandit nisl, et tristique elit scelerisque nec. Fusce eleifend laoreet dui eget aliquet. Ut rutrum risus et nunc pretium scelerisque."],"brochure":"Car-Brochure.Pdf"}',
    '{"interior":["Air Conditioner","Digital Odometer","Heater","Leather Seats","Panoramic Moonroof","Tachometer"],"safety":["Anti-lock Braking","Brake Assist","Child Safety Locks","Driver Air Bag","Power Door Locks"],"exterior":["Fog Lights Front","Rain Sensing Wiper","Rear Spoiler","Windows - Electric"],"comfort":["Android Auto","Apple CarPlay","Bluetooth","HomeLink","Power Steering"]}',
    '{"length":"4108mm","width":"1760mm","height":"1584mm","widthWithMirrors":"1977mm","wheelbase":"2551mm","grossVehicleWeight":"1750 kg","heightWithRoofRails":"1594mm","maxLoadingWeight":"490 kg","luggageCapacityUp":"455 Litres","maxRoofLoad":"75 kg","luggageCapacityDown":"1281 Litres","seats":5}',
    '{"fuelTankCapacity":"40 Litres","minKerbweight":"1270 kg","maxTowingWeightBraked":"1200 kg","turningCircle":"5300 m","maxTowingWeightUnbraked":"630 kg"}'
);

INSERT INTO cars (
    id, slug, name, subtitle, image_key, badge, badges, has_video,
    price, formatted_price, old_price, formatted_old_price, instant_saving,
    quick_specs, overview, dealer, description, features, dimensions, engine_and_transmission
) VALUES (
    11,
    'corolla-altis-2023',
    'Corolla Altis – 2023',
    '3.5 D5 PowerPulse Momentum 5dr AW… Geartronic Estate',
    'p2_car5_660x440',
    NULL,
    '[]',
    true,
    45000,
    '$45,000',
    NULL,
    NULL,
    NULL,
    '{"miles":"15000 Miles","fuel":"Petrol","transmission":"CVT"}',
    '{"body":"Hatchback","mileage":"15000 miles","fuelType":"Petrol","year":2023,"transmission":"CVT","driveType":"Front-Wheel Drive","condition":"Used","engineSize":"1.8L","doors":5,"cylinders":4,"color":"Red","vin":"CA8391029"}',
    '{"name":"admin","avatar":"p1_s7_team5_150x150","address":"943 Broadway, Brooklyn","phone":"+88-123456789","whatsapp":"+88123456789"}',
    '{"paragraphs":["Quisque imperdiet dignissim enim dictum finibus. Sed consectetutr convallis enim eget laoreet. Aenean vitae nisl mollis, porta risus vel, dapibus lectus. Etiam ac suscipit eros, eget maximus","Etiam sit amet ex pharetra, venenatis ante vehicula, gravida sapien. Fusce eleifend vulputate nibh, non cursus augue placerat pellentesque. Sed venenatis risus nec felis mollis, in pharetra urna euismod. Morbi aliquam ut turpis sit amet ultrices. Vestibulum mattis blandit nisl, et tristique elit scelerisque nec. Fusce eleifend laoreet dui eget aliquet. Ut rutrum risus et nunc pretium scelerisque."],"brochure":"Car-Brochure.Pdf"}',
    '{"interior":["Air Conditioner","Digital Odometer","Heater","Leather Seats","Panoramic Moonroof","Tachometer"],"safety":["Anti-lock Braking","Brake Assist","Child Safety Locks","Driver Air Bag","Power Door Locks"],"exterior":["Fog Lights Front","Rain Sensing Wiper","Rear Spoiler","Windows - Electric"],"comfort":["Android Auto","Apple CarPlay","Bluetooth","HomeLink","Power Steering"]}',
    '{"length":"4370mm","width":"1790mm","height":"1435mm","widthWithMirrors":"1990mm","wheelbase":"2640mm","grossVehicleWeight":"1820 kg","heightWithRoofRails":"1445mm","maxLoadingWeight":"460 kg","luggageCapacityUp":"361 Litres","maxRoofLoad":"75 kg","luggageCapacityDown":"1052 Litres","seats":5}',
    '{"fuelTankCapacity":"50 Litres","minKerbweight":"1360 kg","maxTowingWeightBraked":"1300 kg","turningCircle":"5200 m","maxTowingWeightUnbraked":"450 kg"}'
);

INSERT INTO cars (
    id, slug, name, subtitle, image_key, badge, badges, has_video,
    price, formatted_price, old_price, formatted_old_price, instant_saving,
    quick_specs, overview, dealer, description, features, dimensions, engine_and_transmission
) VALUES (
    12,
    'ford-explorer-2023',
    'Ford Explorer 2023',
    '3.5 D5 PowerPulse Momentum 5dr AW… Geartronic Estate',
    'p2_car1_660x440',
    '{"text":"Great Price","type":"green"}',
    '["Great Price"]',
    true,
    35000,
    '$35,000',
    NULL,
    NULL,
    NULL,
    '{"miles":"10 Miles","fuel":"Diesel","transmission":"CVT"}',
    '{"body":"SUV","mileage":"10 miles","fuelType":"Diesel","year":2023,"transmission":"CVT","driveType":"All-Wheel Drive","condition":"New","engineSize":"3.5L","doors":5,"cylinders":6,"color":"Grey Metallic","vin":"FE8391024"}',
    '{"name":"admin","avatar":"p1_s7_team5_150x150","address":"943 Broadway, Brooklyn","phone":"+88-123456789","whatsapp":"+88123456789"}',
    '{"paragraphs":["Quisque imperdiet dignissim enim dictum finibus. Sed consectetutr convallis enim eget laoreet. Aenean vitae nisl mollis, porta risus vel, dapibus lectus. Etiam ac suscipit eros, eget maximus","Etiam sit amet ex pharetra, venenatis ante vehicula, gravida sapien. Fusce eleifend vulputate nibh, non cursus augue placerat pellentesque. Sed venenatis risus nec felis mollis, in pharetra urna euismod. Morbi aliquam ut turpis sit amet ultrices. Vestibulum mattis blandit nisl, et tristique elit scelerisque nec. Fusce eleifend laoreet dui eget aliquet. Ut rutrum risus et nunc pretium scelerisque."],"brochure":"Car-Brochure.Pdf"}',
    '{"interior":["Air Conditioner","Digital Odometer","Heater","Leather Seats","Panoramic Moonroof","Tachometer"],"safety":["Anti-lock Braking","Brake Assist","Child Safety Locks","Driver Air Bag","Power Door Locks"],"exterior":["Fog Lights Front","Rain Sensing Wiper","Rear Spoiler","Windows - Electric"],"comfort":["Android Auto","Apple CarPlay","Bluetooth","HomeLink","Power Steering"]}',
    '{"length":"5050mm","width":"2004mm","height":"1778mm","widthWithMirrors":"2268mm","wheelbase":"3025mm","grossVehicleWeight":"2790 kg","heightWithRoofRails":"1788mm","maxLoadingWeight":"750 kg","luggageCapacityUp":"515 Litres","maxRoofLoad":"100 kg","luggageCapacityDown":"2486 Litres","seats":7}',
    '{"fuelTankCapacity":"73 Litres","minKerbweight":"2040 kg","maxTowingWeightBraked":"2500 kg","turningCircle":"6000 m","maxTowingWeightUnbraked":"750 kg"}'
);

