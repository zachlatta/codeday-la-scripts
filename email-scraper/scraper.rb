require 'anemone'

EMAIL_REGEX = /[A-Z0-9._%a-z\-]+@(?:[A-Z0-9a-z\-]+\.)+[A-Za-z]{2,4}/i

ARGF.each do |line|
  begin
    Anemone.crawl(URI(line), discard_page_bodies: true,
                  depth_limit: 5) do |anemone|
      anemone.on_every_page do |page|
        page.body.scan(EMAIL_REGEX).each do |email|
          puts "#{page.url} #{email}"
        end
      end
    end
  rescue
    puts "#{line.strip} is not a valid URI."
    exit(0)
  end
end
