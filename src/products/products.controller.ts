import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateProductDto } from './dto/update-product.dto';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';

@Controller('products')
export class ProductsController {
  constructor(private products: ProductsService) {}

  @Post('/create')
  @UseGuards(AuthGuard)
  @UseInterceptors(AnyFilesInterceptor())
  createProduct(
    @Body() input: CreateProductDto,
    @UploadedFiles() files: any[],
  ) {
    return this.products.createProduct(input, files);
  }

  @Get()
  @UseGuards(AuthGuard)
  findProductsByUser(@Query('userId') userId: string) {
    return this.products.findProductsByUser(+userId);
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  findUniqueProduct(@Param('id') id: string) {
    return this.products.findUniqueProduct(+id);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  updateProduct(@Param('id') id: string, @Body() input: UpdateProductDto) {
    return this.products.updateProduct(+id, input);
  }

  @Patch('/:id/images')
  @UseGuards(AuthGuard)
  @UseInterceptors(AnyFilesInterceptor())
  updateProductImages(
    @Param('id') id: string,
    @UploadedFiles() images: { buffer: Buffer | ArrayBuffer }[],
  ) {
    return this.products.updateProductImages(+id, images);
  }
}
