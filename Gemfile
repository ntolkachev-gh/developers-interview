source "https://rubygems.org"

# Ruby version for Heroku
ruby "3.1.0"

# Jekyll
gem "jekyll", "~> 4.3.0"

# Веб-сервер для Heroku
gem "puma", "~> 5.6"
gem "rack", "~> 2.2"
gem "rack-contrib", "~> 2.3"

# Плагины Jekyll
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
  gem "jekyll-sitemap"
  gem "jekyll-seo-tag"
  gem "jekyll-toc"
  gem "jekyll-paginate"
  gem "jekyll-archives"
end

# Темы
gem "minima", "~> 2.5"

# GitHub Pages совместимость (только для development)
group :development do
  gem "github-pages"
end

# Windows и JRuby не включают файлы zoneinfo, поэтому bundle gem tzinfo-data
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]

# Lock `http_parser.rb` gem to `v0.6.x` on JRuby builds since newer versions of the gem
# do not have a Java counterpart.
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin] 