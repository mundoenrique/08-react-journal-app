import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from '../../helpers';

cloudinary.config({
	cloud_name: 'dfzenqqko',
	api_key: '626529221213334',
	api_secret: '0q9-1gqtfvt5Fzf00apxYiVONo0',
	secure: true,
});

describe('Pruebas en fileUpload', () => {
	test('Debe subir el archivo correctamente', async () => {
		const imgUrl = 'http://localhost:3008/favicon.ico';

		const resp = await fetch(imgUrl);
		const blob = await resp.blob();
		const file = new File([blob], 'test-image.jpg');
		const url = await fileUpload(file);
		const segments = url.split('/');
		const imgId = segments[segments.length - 1].replace('.ico', '');

		expect(typeof url).toBe('string');

		await cloudinary.api.delete_resources([`journal/${imgId}`], {
			resource_type: 'image',
		});
	});
});
