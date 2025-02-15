FROM node:20-slim AS build

COPY . /app

WORKDIR /app

RUN npm install -g pnpm --registry https://registry.npmmirror.com
# RUN npm install -g pnpm

RUN cd /app/frontend && pnpm i  --registry https://registry.npmmirror.com && pnpm build
# If not in China, do not set the registry.
# RUN cd /app/frontend && pnpm i && pnpm build


FROM node:20-slim

# 最终的执行镜像

RUN npm install -g pnpm --registry https://registry.npmmirror.com
# RUN npm install -g pnpm

COPY --from=build /app/backend/dist /app/dist

COPY ./backend /app

WORKDIR /app

RUN pnpm i  --registry https://registry.npmmirror.com
# If not in China, do not set the registry.
# RUN pnpm i

EXPOSE 3000
CMD [ "pnpm", "start" ]