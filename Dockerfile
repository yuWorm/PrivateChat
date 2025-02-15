FROM node:20-slim AS base
# 创建基础镜像
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY ./backend /app
WORKDIR /app

FROM base AS prod-deps
# 运行依赖
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
# 构建前端项目
COPY ./frontend /app/frontend
RUN mkair /app/backend
WORKDIR /app/frontend
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

FROM base
# 最终的执行镜像
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/backend/dist /app/dist
EXPOSE 8000
CMD [ "pnpm", "start" ]