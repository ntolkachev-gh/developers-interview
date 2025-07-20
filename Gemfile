source "https://rubygems.org"

# Ruby version for Heroku
ruby "2.6.10"

# Jekyll
gem "jekyll", "~> 4.2.0"

# Веб-сервер для Heroku
gem "puma", "~> 5.6"
gem "rack", "~> 2.2"
gem "rack-contrib", "~> 2.3"

# Плагины Jekyll
gem "jekyll-feed", "~> 0.15"
gem "jekyll-sitemap", "~> 1.4"
gem "jekyll-seo-tag", "~> 2.7"

# Темы
gem "minima", "~> 2.5"

# Для production
gem "webrick", "~> 1.7"

# Windows и JRuby не включают файлы zoneinfo, поэтому bundle gem tzinfo-data
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]

# Lock `http_parser.rb` gem to `v0.6.x` on JRuby builds since newer versions of the gem
# do not have a Java counterpart.
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin] 