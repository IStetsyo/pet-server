import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileService } from '../file/file.service';

@Injectable()
export class ProductsService {
  private readonly prisma: PrismaService;
  private readonly file: FileService;

  constructor(prisma: PrismaService, file: FileService) {
    this.prisma = prisma;
    this.file = file;
  }

  async findProductsByUser(userId: number) {
    return this.prisma.product.findMany({
      where: {
        userId,
      },
    });
  }
  async findUniqueProduct(productId: number) {
    return this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });
  }
  async createProduct(
    input: CreateProductDto,
    images: { buffer: Buffer | ArrayBuffer }[],
  ) {
    const imageUrls = await this.file.loadFiles(images);
    return this.prisma.product.create({
      data: {
        ...input,
        price: +input.price,
        imageUrls,
        userId: +input.userId,
      },
    });
  }
  async deleteProduct(productId: number) {
    return this.prisma.product.delete({
      where: {
        id: productId,
      },
    });
  }
  async updateProduct(id: number, input: UpdateProductDto) {
    return this.prisma.product.update({
      where: {
        id,
      },
      data: input,
    });
  }
  async updateProductImages(
    productId: number,
    images: { buffer: Buffer | ArrayBuffer }[],
  ) {
    const imageUrls = await this.file.loadFiles(images);
    return this.prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        imageUrls,
      },
    });
  }
}
