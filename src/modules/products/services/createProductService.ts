import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../entities/product';
import { ProductRepository } from '../repositories/productsRepository';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);
    const foundProduct = await productsRepository.findByName(name);

    if (foundProduct) {
      throw new AppError('This product already exists.');
    }

    const product = productsRepository.create({
      name,
      price,
      quantity,
    });

    await productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
